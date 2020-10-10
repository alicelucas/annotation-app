import React from 'react'
import Slider from "@material-ui/core/Slider";

export const BrightnessSlider = (props) => {

    const handleChange = (event, newValue) => {
        props.onChange(newValue)
    }
    //TODO fix the fact that things are discontinuous when going from 0 to 1
    return (
        <div>
            <Slider
                value={props.value * 100}
                onChange={handleChange}
                min={0}
                max={100}
                aria-labelledby="continuous-slider" />
        </div>
    )
}