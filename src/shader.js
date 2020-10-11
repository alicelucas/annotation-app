export const shaders = {


    vertexShader: `
    varying vec2 vTextureCoord;
    void main() {    
      vTextureCoord = uv;
      gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4( position, 1.0 );
    }
   `,
    fragmentShader: `
    uniform float brightness;
    uniform float contrast;
    
    uniform sampler2D uSampler;
    varying vec2 vTextureCoord;
    
    mat4 brightnessMatrix( float brightness )
    {
        return mat4( 1, 0, 0, 0,
                     0, 1, 0, 0,
                     0, 0, 1, 0,
                     brightness, brightness, brightness, 1 );
    }
    mat4 contrastMatrix( float contrast )
    {
    float t = ( 1.0 - contrast ) / 2.0;
        
        return mat4( contrast, 0, 0, 0,
                     0, contrast, 0, 0,
                     0, 0, contrast, 0,
                     t, t, t, 1 );
    }
    
    void main() {
      gl_FragColor = texture2D(uSampler, vTextureCoord);
      gl_FragColor = brightnessMatrix( brightness ) * contrastMatrix( contrast ) * gl_FragColor;   
    }
    `
};



//Temporary notes (from MDN Docs)
//The vertex shader is run for each vertex in the shape. Its job is to transform the input vertex from its original
// coordinate system into the clip space coordinate system usedby WebGL, in which each axis has a range from -1.0 to
// 1.0.
//gl_Position is a special variable provided by GLSL. It represents the transformed vertices.
// The vertex shader can also determine the coordinates within the face's texture of the texel applied to the vertex.
// This information can be stored in "varying", to be shared with the fragment shader.

// The fragment shader is called once for every pixel on each shape to be drawn, after the shape's vertices have been
// processed by the vertex shader. Its job is to determine the color of that pixel by figuring out which texel to
// apply to the pixel, getting that texel's color, then applying the appropriate lighting to that color.
// The color is then returned to the WebGL layer by storing it in the special variable gl_FragColor. That color is then
// drawn to the screen in the correct position.

// Also read https://threejs.org/docs/index.html#api/en/materials/ShaderMaterial

// Built-in uniforms and attributes https://threejs.org/docs/index.html#api/en/renderers/webgl/WebGLProgram