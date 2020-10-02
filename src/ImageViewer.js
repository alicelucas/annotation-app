import React, {useRef} from 'react'
import {Canvas} from 'react-three-fiber'
import {Image} from "./Image";


export const ImageViewer = () => {
    return (
        <Canvas camera={{fov: 80, near:0.1, far:1000, position: [0, 0, 1000] }}>
            <Image/>
        </Canvas>
        )
};
