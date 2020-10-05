import {Box, useTextureLoader} from "@react-three/drei";
import React from "react";
import bioImage from "./textures/cho44.png";

export const Image = () => {
    const texture = useTextureLoader(bioImage)
    return(
        <mesh>
            <Box args={[1, 1]}>
                <meshBasicMaterial attach="material" map={texture}/>
            </Box>
        </mesh>
        )

}
