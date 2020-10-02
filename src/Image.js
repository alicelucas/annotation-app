import React, { useRef, useState } from 'react'
import * as THREE from 'three'
import bioImage from "./textures/cho44.png"

const texture = new THREE.TextureLoader().load(bioImage)

export const Image = () => {
    return (
        <mesh>
            <boxBufferGeometry args={[1376,1032,1]}/>
            <meshBacMaterial>
                <primitive attach="map" object={texture} />
            </meshBacMaterial>

        </mesh>
    )
}