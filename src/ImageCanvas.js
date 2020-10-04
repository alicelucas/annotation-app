import React, {Suspense} from 'react'
import {TransformControls} from "@react-three/drei";
import {Image} from "./Image.js"

export const ImageCanvas = () => {
    return (
        <TransformControls mode={"translate"}>
            <Suspense fallback={null}>
                <Image/>
            </Suspense>
        </TransformControls>
    )
}
