import {Box, useTextureLoader} from "@react-three/drei";
import React from "react";
import bioImage from "./textures/cho44.png";
import Image from "image-js";

export const ImageBox = () => {
    const aspectRatio = Image.load(bioImage).then(function (image) {
        console.log('Width', image.width);
        console.log('Height', image.height);
        console.log('colorModel', image.colorModel);
        console.log('components', image.components);
        console.log('alpha', image.alpha);
        console.log('channels', image.channels);
        console.log('bitDepth', image.bitDepth);
        return image.width / image.height;
    })
    const texture = useTextureLoader(bioImage)
    return(
        <mesh>
            <Box args={[1, 1]}>
                <meshBasicMaterial attach="material" map={texture}/>
            </Box>
        </mesh>
        )

}
