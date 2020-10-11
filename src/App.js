import React, {Suspense, useState} from 'react';
import './App.css';
import {ImageViewer} from "./ImageViewer.js"
import {Canvas} from "react-three-fiber";
import {OrbitControls, PerspectiveCamera, TransformControls} from "@react-three/drei";
import {ImageCanvas} from "./ImageCanvas";
import {ImageMesh} from "./ImageMesh";
import {Controls, ControlsProvider, useControl} from "react-three-gui";
import {BrightnessSlider, ContrastSlider} from "./Sliders";

function App() {
    const [brightness, setBrightness] = useState(0.0)
    const [contrast, setContrast] = useState(1.0)

    const onBrightnessChange = (value) => {
        //const parsedValue =
        setBrightness(value === 0 ? 0 : value / 100)
    }
    const onContrastChange = (value) => {
        //const parsedValue =
        setContrast(value === 0 ? 0 : value / 100)
        console.log(contrast)
    }

    //TODO Go back to using TransformControls when you have figured out proper panning.
    return (
    <div className="App">
        <BrightnessSlider onChange={onBrightnessChange} value={brightness}/>
        <ContrastSlider onChange={onContrastChange} value={contrast}/>
        <Canvas
            //camera={{fov: 80, near:0.1, far:5000, position: [0, 0, 1000] }}
            colorManagement={false}
            onCreated={ ({gl}) => {
                gl.setClearColor('black')
            }}
        >
            <PerspectiveCamera makeDefault position={[0, 0, 2]}/>
            {/*<TransformControls mode={"translate"}>*/}
                <Suspense fallback={null}>
                    <ImageMesh brightness={brightness} contrast={contrast}/>
                </Suspense>
            {/*</TransformControls>*/}
            <OrbitControls enableRotate={false} />
        </Canvas>
    </div>
  );
}

export default App;
