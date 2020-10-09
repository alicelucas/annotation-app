import React from 'react'
import Slider from "@material-ui/core/Slider";

export const BrightnessSlider = (props) => {

    const handleChange = (event, newValue) => {
        console.log(newValue)
        props.onChange(newValue)
    }
    return (
        <div>
            //TODO fix the fact that things are discontinuous when going from 0 to 1
            <Slider
                value={props.value}
                onChange={handleChange}
                min={0.0}
                max={1.0}
                aria-labelledby="continuous-slider" />
        </div>
    )
}