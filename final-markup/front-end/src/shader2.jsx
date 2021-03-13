import * as THREE from "three"
import React, { useRef } from "react"
import { Canvas, extend, useFrame, useThree, drei } from "react-three-fiber"
// import { shaderMaterial } from "drei"
import glsl from "babel-plugin-glsl/macro"

const ColorMaterial = ShaderMaterial(
  { time: 0, color: new THREE.Color(0.2, 0.0, 0.1) },
  // the tag is optional, it allows the VSC to syntax highlibht and lint glsl,
  // also allows imports and other things
  glsl`varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }`,
  glsl`uniform float time;
    uniform vec3 color;
    varying vec2 vUv;
    void main() {
      gl_FragColor.rgba = vec4(0.5 + 0.3 * sin(vUv.yxx + time) + color, 1.0);
    }`
)

extend({ ColorMaterial })

function Bg() {
  const { viewport } = useThree()
  const max = Math.max(viewport.width, viewport.height)
  const ref = useRef()
  useFrame((state, delta) => (ref.current.time += delta))
  return (
    <mesh scale={[max, max, 1]}>
      <planeBufferGeometry />
      <colorMaterial ref={ref} />
    </mesh>
  )
}

function Box() {
  const ref = useRef()
  useFrame((state, delta) => {
    ref.current.material.time += delta
    ref.current.rotation.x = ref.current.rotation.y = ref.current.rotation.z += delta / 2
  })
  return (
    <mesh ref={ref} scale={[2, 2, 2]}>
      <boxBufferGeometry />
      <colorMaterial color="#203050" />
    </mesh>
  )
}

export default function FiberFrame() {
  return (
    <Canvas>
      <Bg />
      {/*<Box />*/}
    </Canvas>
  )
}



///////////
