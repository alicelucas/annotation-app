import React, {Suspense} from 'react'
import {Canvas} from 'react-three-fiber'
import {OrbitControls} from "@react-three/drei";
import {ImageControl} from "./ImageControl";

export const ImageViewer = () => {
    return (
        <Canvas camera={{fov: 80, near:0.1, far:5000, position: [0, 0, 1000] }} colorManagement={false}>
            <Suspense fallback={null}>
                <ImageControl/>
                <OrbitControls enableRotate={false} />
            </Suspense>
        </Canvas>
    )
};