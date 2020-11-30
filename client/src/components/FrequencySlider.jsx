import React from "react";

import Slider from "@material-ui/core/Slider";

const FrequencySlider = () => {
    const marks = [
        {
            value: 88,
            label: "88MHz",
        },
        {
            value: 90,
            label: "90MHz",
        },
        {
            value: 92,
            label: "92MHz",
        },
        {
            value: 94,
            label: "94MHz",
        },
        {
            value: 96,
            label: "96MHz",
        },
        {
            value: 98,
            label: "98MHz",
        },
        {
            value: 100,
            label: "100MHz",
        },
        {
            value: 102,
            label: "102MHz",
        },
        {
            value: 104,
            label: "104MHz",
        },
        {
            value: 106,
            label: "106MHz",
        },
        {
            value: 108,
            label: "108MHz",
        },
    ];

    return (
        <div
            style={{
                position: "absolute",
                bottom: "5vh",
                zIndex: "250",
                left: "10vw",
                width: "80vw",
            }}
        >
            <Slider
                style={{ color: "#fff" }}
                defaultValue={99.9}
                aria-labelledby="discrete-slider-always"
                min={88.1}
                max={107.9}
                step={0.2}
                marks={marks}
                valueLabelDisplay="on"
            />
        </div>
    );
};

export default FrequencySlider;
