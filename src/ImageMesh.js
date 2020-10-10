import {Box, useTextureLoader} from "@react-three/drei";
import React, {Suspense, useEffect, useMemo, useRef, useState} from "react";
import bioImage from "./textures/cho44.png";
import bioImage2 from "./textures/01_POS002_F.TIF"
import Image from "image-js";
import {useFrame, useUpdate} from "react-three-fiber";
import * as THREE from "three";
import { shaders } from "./shader";


function ShaderMaterial(props) {

    const ref = useRef()
    const texture = useTextureLoader(props.image)


    // TODO: why does useMemo fix it?
    const uniforms = useMemo( () => {
        return (
            {
                uSampler: {
                    value: texture
                },
                brightness: {
                    value: props.brightness
                },
            }
        )
    },[])


    useFrame((state) => {
        ref.current.uniforms.brightness.value = props.brightness;
    });

    return (
        <shaderMaterial
            ref={ref}
            attach = "material"
            vertexShader={shaders.vertexShader}
            fragmentShader={shaders.fragmentShader}
            uniforms={uniforms}/>
    )
}

export const ImageMesh = (props) => {
    const [image, setImage] = useState('')
    //const [brightness, setBrightness] = useState(0.2);

    // const handleClick = () => {
    //     console.log(brightness)
    //     setBrightness(brightness + 0.1);
    // };

    useEffect( () => {
        const fetchImage = async () => {
            const img = await Image.load(bioImage)
            const bImage = await img.toDataURL();
            setImage(bImage)
        }
        fetchImage().catch( (reason) => {console.log("Error while loading image: " + reason)})
    },[])

    //TODO: toDataURL may be returning a promise. You have to handle it. I think this is the reason
    //why the screen is black sometimes.
    // const texture = image && useTextureLoader(image)
    //const texture = useTextureLoader(bioImage)
    // console.log(texture);


    return(
            <mesh>
                {/*<sphereBufferGeometry attach="geometry" args={[2, 16, 16]} />*/}
                {image &&
                    <Box args={[1, 1]}>
                        <ShaderMaterial brightness={props.brightness} image={image}/>
                        {/* <ShaderMaterial brightness={props.brightness}/>*/}
                    </Box>
                }
            </mesh>
        )

}
