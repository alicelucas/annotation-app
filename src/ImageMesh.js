import {Box, useTextureLoader} from "@react-three/drei";
import React, {Suspense, useEffect, useMemo, useRef, useState} from "react";
import bioImage from "./textures/cho44.png";
import bioImage2 from "./textures/01_POS002_F.TIF"
import Image from "image-js";
import {useFrame, useUpdate} from "react-three-fiber";
import { shaders } from "./shader";

function ShaderMaterial(props) {

    // We create ref to access shaderMaterial's uniforms property later, in useFrame
    const ref = useRef()
    const texture = useTextureLoader(props.imageURL)

    //useMemo: when no array is provided in the dependency, a new value is computed on every render.
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

    //This hook calls you back every frame.
    useFrame((state) => {
        ref.current.uniforms.brightness.value = props.brightness;
    });

    return (
        <shaderMaterial
            ref={ref}
            attach="material"
            vertexShader={shaders.vertexShader}
            fragmentShader={shaders.fragmentShader}
            uniforms={uniforms}/>
    )
}

export const ImageMesh = (props) => {
    const [imageURL, setImageURL] = useState('')
    const [aspectRatio, setAspectRatio] = useState(1)

    useEffect( () => {
        const fetchImage = async () => {
            const img = await Image.load(bioImage)
            setAspectRatio(img.width / img.height)
            const imageURL = await img.toDataURL();
            setImageURL(imageURL)
        }
        fetchImage().catch( (reason) => {console.log("Error while loading image: " + reason)})
    },[])

    return(
            <mesh>
                {imageURL &&
                    <Box args={[aspectRatio, 1]}>
                        <ShaderMaterial brightness={props.brightness} imageURL={imageURL}/>
                    </Box>
                }
            </mesh>
        )

}
