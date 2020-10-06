import React, {Suspense} from 'react';
import './App.css';
import {ImageViewer} from "./ImageViewer.js"
import {Canvas} from "react-three-fiber";
import {OrbitControls, PerspectiveCamera, TransformControls} from "@react-three/drei";
import {ImageCanvas} from "./ImageCanvas";
import {ImageBox} from "./ImageBox";

function App() {
  return (
    <div className="App">
        <Canvas
            //camera={{fov: 80, near:0.1, far:5000, position: [0, 0, 1000] }}
            colorManagement={false}
            onCreated={ ({gl}) => {
                gl.setClearColor('black')
            }}
        >
            <PerspectiveCamera makeDefault position={[0, 0, 1]}/>
            <TransformControls mode={"translate"}>
                <Suspense fallback={null}>
                    <ImageBox/>
                </Suspense>
            </TransformControls>
            <OrbitControls enableRotate={false} />
        </Canvas>
    </div>
  );
}

export default App;
