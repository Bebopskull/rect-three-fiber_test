import { extend, drei } from "react-three-fiber"
// import { shaderMaterial } from "drei"
import * as THREE from "three"

export default ()=>{

  const ImageFadeMaterial = new THREE.RawShaderMaterial(
    {
      effectFactor: 1.2,
      dispFactor: 0,
      
    },
    `
    void main() { 
      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    }
    `,
    `
    uniform vec3 u_color;
    uniform sampler2D tex;
    uniform vec2 u_resolution;
    uniform vec2 u_mouse;
    uniform float u_time;
    void main (void){
      vec2 st = gl_FragCoord.xy/u_resolution;
      vec2 m = (vec2(0.5)+u_mouse/100.)+vec2(0.2);
      //vec4 color = vec4((0.*(st.x/0.005)),(cos(u_time *(st.y /0.0005)/(0.3+m))),m);
      vec4 color =vec4(tan(st.y/0.005)*m,m);
      gl_FragColor=color;
    }
    `
    // `varying vec2 vUv;
    // void main() {
    //   vUv = uv;
    //   gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    // }`,
    // `varying vec2 vUv;
    // uniform sampler2D tex;
    // uniform sampler2D tex2;
    // uniform sampler2D disp;
    // uniform float _rot;
    // uniform float dispFactor;
    // uniform float effectFactor;
    // void main() {
    //   vec2 uv = vUv;
    //   vec4 disp = texture2D(disp, uv);
    //   vec2 distortedPosition = vec2(uv.x, uv.y + dispFactor * (disp.r*effectFactor));
    //   vec2 distortedPosition2 = vec2(uv.x, uv.y - (1.0 - dispFactor) * (disp.r*effectFactor));
    //   vec4 _texture = texture2D(tex, distortedPosition);
    //   vec4 _texture2 = texture2D(tex2, distortedPosition2);
    //   vec4 finalTexture = mix(_texture, _texture2, dispFactor);
    //   gl_FragColor = finalTexture;
    // }`
  )

  extend({ ImageFadeMaterial })

}
