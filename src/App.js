import React, {Suspense, useState} from 'react';
import './App.css';
import {ImageViewer} from "./ImageViewer.js"
import {Canvas} from "react-three-fiber";
import {OrbitControls, PerspectiveCamera, TransformControls} from "@react-three/drei";
import {ImageCanvas} from "./ImageCanvas";
import {ImageMesh} from "./ImageMesh";
import {Controls, ControlsProvider, useControl} from "react-three-gui";
import {BrightnessSlider} from "./BrightnessSlider";

function App() {
    const [brightness, setBrightness] = useState(0.3)

    const onBrightnessChange = (value) => {
        //const parsedValue =
        setBrightness(value === 0 ? 0 : value / 100)
        console.log(brightness)
    }

    return (
    <div className="App">
        <BrightnessSlider onChange={onBrightnessChange} value={brightness}/>
        <Canvas
            //camera={{fov: 80, near:0.1, far:5000, position: [0, 0, 1000] }}
            colorManagement={false}
            onCreated={ ({gl}) => {
                gl.setClearColor('black')
            }}
        >
            <PerspectiveCamera makeDefault position={[0, 0, 2]}/>
            //TODO Go back to using TransformControls when you have figured out proper panning.
            {/*<TransformControls mode={"translate"}>*/}
                <Suspense fallback={null}>
                    <ImageMesh brightness={brightness}/>
                </Suspense>
            {/*</TransformControls>*/}
            <OrbitControls enableRotate={false} />
        </Canvas>
    </div>
  );
}

export default App;
