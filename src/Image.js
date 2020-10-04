import {Box, useTextureLoader} from "@react-three/drei";
import React from "react";
import bioImage from "./textures/cho44.png";

export const Image = () => {
    const texture = useTextureLoader(bioImage)
    return(
        <mesh>
            <Box args={[1376, 1032, 1]}>
                <meshBasicMaterial attach="material">
                    <primitive attach="map" object={texture}/>
                </meshBasicMaterial>
            </Box>
        </mesh>
        )

}
