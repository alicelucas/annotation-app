import {Box, useTextureLoader} from "@react-three/drei";
import React, {useEffect, useState} from "react";
import bioImage from "./textures/cho44.png";
import Image from "image-js";

export const ImageBox = () => {
    const [aspectRatio, setAspectRatio] = useState(1);

    useEffect( () => {
        const fetchAspectRatio = async () => {
            const image = await Image.load(bioImage)
            setAspectRatio(image.width / image.height)
        }
        fetchAspectRatio().catch( () => {console.log("Error while loading image.")})
    },[])

    const texture = useTextureLoader(bioImage)
    return(
        <mesh>
            <Box args={[aspectRatio, 1]}>
                <meshBasicMaterial attach="material" map={texture}/>
            </Box>
        </mesh>
        )

}
