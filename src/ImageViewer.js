import React from 'react'
import {Canvas} from 'react-three-fiber'
import {OrbitControls} from "@react-three/drei";
import {ImageCanvas} from "./ImageCanvas";

export const ImageViewer = () => {
    return (
        <Canvas
            camera={{fov: 80, near:0.1, far:5000, position: [0, 0, 1000] }}
            colorManagement={false}
            onCreated={ ({gl}) => {
                gl.setClearColor('black')
            }}
        >
            <ImageCanvas/>
            <OrbitControls enableRotate={false} />
        </Canvas>
    )
};