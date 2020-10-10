import {Box, useTextureLoader} from "@react-three/drei";
import React, {Suspense, useEffect, useMemo, useRef, useState} from "react";
import bioImage from "./textures/cho44.png";
import bioImage2 from "./textures/01_POS002_F.TIF"
import Image from "image-js";
import {useFrame, useUpdate} from "react-three-fiber";
import * as THREE from "three";
import { shaders } from "./shader";


function AliceMaterial(props) {
    const ref = useRef()
    const texture_uniform = {
        uSampler: {
            value: props.texture
        }
    }
    const uniforms = useMemo(
        () =>
            // THREE.UniformsUtils.merge([THREE.UniformsLib.lights, shaders.uniforms]),
            THREE.UniformsUtils.merge([texture_uniform, shaders.uniforms]),
        []
    );

    useFrame((state) => {
        // @ts-ignore
        // ref.current = { uniforms: {}}
        ref.current.uniforms.brightness.value = props.brightness;
        ref.current.uniforms.uSampler.value = props.texture;
    });



    return (
        <shaderMaterial
            ref={ref} // ADDED BY TIMUR
            attach = "material"
            vertexShader={vertexShader}
            fragmentShader={fragmentShader}
            uniforms={uniforms}/>
    )
}

const vertexShader = `
  varying vec2 vTextureCoord;
  void main() {
    vTextureCoord = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
  }
`;

const fragmentShader = `
  uniform float brightness;
  uniform sampler2D uSampler;
  varying vec2 vTextureCoord;
  void main() {
    gl_FragColor = texture2D(uSampler, vTextureCoord);
    gl_FragColor.rgb = gl_FragColor.rgb + brightness;
  }
`;

export const ImageMesh = (props) => {
    const [image, setImage] = useState(new Image())
    const [brightness, setBrightness] = useState(0.2);

    const handleClick = () => {
        console.log(brightness)
        setBrightness(brightness + 0.1);
    };

    useEffect( () => {
        const fetchImage = async () => {
            const img = await Image.load(bioImage)
            setImage(img)
        }
        fetchImage().catch( (reason) => {console.log("Error while loading image: " + reason)})
    },[])

    //TODO: toDataURL may be returning a promise. You have to handle it. I think this is the reason
    //why the screen is black sometimes.
    // const texture = useTextureLoader(image.toDataURL())
    const texture = useTextureLoader(image.toDataURL())
    // const uniforms = {
    //     uSampler: {
    //         value: texture
    //     },
    //     brightness: {
    //         value: props.brightness
    //     },
    // };
    //TODO: Is this the proper use of suspense
    return(
        <Suspense>
            <mesh onClick={handleClick}>
                {/*<sphereBufferGeometry attach="geometry" args={[2, 16, 16]} />*/}
                <Box args={[image.width / image.height, 1]}>
                    {/*<shaderMaterial ref={ref} attach="material"*/}
                    {/*                vertexShader={vertexShader}*/}
                    {/*                fragmentShader={fragmentShader}*/}
                    {/*                uniforms={uniforms}/>*/}
                    <AliceMaterial brightness={brightness} texture={texture}/>
                </Box>
            </mesh>
        </Suspense>

        )

}
