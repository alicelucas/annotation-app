export const shaders = {
    vertexShader: `
    varying vec2 vTextureCoord;
    void main() {    
      vTextureCoord = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    }
   `,

    fragmentShader: `
    uniform float brightness;
    uniform sampler2D uSampler;
    varying vec2 vTextureCoord;
    void main() {
      gl_FragColor = texture2D(uSampler, vTextureCoord);
      gl_FragColor.rgb = gl_FragColor.rgb + brightness;   
    }
    `
};