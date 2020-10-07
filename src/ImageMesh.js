import {Box, useTextureLoader} from "@react-three/drei";
import React, {useEffect, useRef, useState} from "react";
import bioImage from "./textures/cho44.png";
import Image from "image-js";

export const ImageMesh = () => {
    const [image, setImage] = useState(new Image())
    const [hovered, setHover] = useState(false)

    useEffect( () => {
        const fetchImage = async () => {
            const img = await Image.load(bioImage)
            setImage(img)
        }
        fetchImage().catch( () => {console.log("Error while loading image.")})
    },[])

    const gaussian = image.gaussianFilter({radius: 5})
    const texture = useTextureLoader(gaussian.toDataURL())

    return(
        <mesh onPointerOver={ (e) => setHover(true)} onPointerOut={(e) => setHover(false)}>
            <Box args={[image.width / image.height, 1]}>
                <meshBasicMaterial attach="material" map={texture}/>
            </Box>
        </mesh>
        )

}
