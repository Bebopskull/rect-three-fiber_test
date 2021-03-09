import React, { useRef, useState } from 'react'
import { Canvas, useFrame, useLoader, useThree  } from 'react-three-fiber'
import * as THREE from 'three';
import { extend } from 'react-three-fiber'
import glsl from 'babel-plugin-glsl/macro'
import shaders from './shaders.jsx'
// import { shaderMaterial } from "drei"


// const [texture1, texture2, dispTexture] = useLoader(THREE.TextureLoader, [url1, url2, disp])
    
export default () => {

    const ColorMaterial = new THREE.ShaderMaterial(
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
  );

  extend({ ColorMaterial })

  const ColorShiftMaterial = new THREE.ShaderMaterial(
    { time: 0, color: new THREE.Color(0.2, 0.0, 0.1) },
    // vertex shader
    glsl`
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    // fragment shader
    glsl`
      uniform float time;
      uniform vec3 color;
      varying vec2 vUv;
      void main() {
        gl_FragColor.rgba = vec4(0.5 + 0.3 * sin(vUv.yxx + time) + color, 1.0);
      }
    `
  )
  extend({ ColorShiftMaterial })

};