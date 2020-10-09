export const shaders = {
    uniforms: {
        foo: {
            type: "f",
            value: 0.5
        }
    },
    vertexShader: `
    uniform float foo;
  
    void main() 
    {
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,

    fragmentShader: `
    uniform float foo;

    void main() {
      gl_FragColor = vec4(foo, foo, foo, 1.0);
    }
  `
};


// const uniforms_unmerged =    {
//     uSampler: {
//         value: props.texture
//     },
//     brightness: {
//         value: props.foo
//     },
// }
