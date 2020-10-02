import React from 'react'
import {TransformControls, useTextureLoader} from "@react-three/drei";
import {Image} from "./Image.js"

export const ImageControl = () => {
    return (
        <TransformControls mode={"translate"}>
            <Image/>
        </TransformControls>
    )
}
