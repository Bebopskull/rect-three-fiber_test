import React, { useRef, useState } from 'react'
import { Canvas, useFrame, useLoader, useThree  } from 'react-three-fiber'
import * as THREE from 'three';
import { extend } from 'react-three-fiber'
import glsl from 'babel-plugin-glsl/macro'
// import shaders from './shaders.jsx'
// import { ImageFadeMaterial } from './fragmentShader.js'

function Box(props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef()
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => {
    mesh.current.rotation.x = mesh.current.rotation.y 
  })
  // const [colorShiftMaterial] = useState(() => {

    
  // })
  

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
      onClick={(e) => setActive(!active)}
      onPointerOver={(e) => setHover(true)}
      onPointerOut={(e) => setHover(false)}>
      <planeBufferGeometry args={[7, 7]} />
      <meshStandardMaterial color={ 'hotpink' } />
      {/*<colorShiftMaterial attach="material" color="hotpink" time={1} />*/}
      {/*<colorMaterial color="#203050" />*/}
      {/*<shaderMaterial
          args={[CrossFadeShader]}
          uniforms-texture-value={texture1}
          uniforms-texture2-value={texture2}
          uniforms-disp-value={dispTexture}
          uniforms-dispFactor-value={0.5} />*/}

    </mesh>
    
  )
}

const dimensions = {height: '300px', width: '300px'};

export default function FiberFrame() {
  return (
    <Canvas style={dimensions}>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Box position={[0, 0]} />
      {/*<planeBufferGeometry position={[0.25, 0]} />*/}

    </Canvas>
  )
}
