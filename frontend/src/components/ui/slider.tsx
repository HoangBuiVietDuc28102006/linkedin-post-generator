import { useState, useEffect, useRef } from "react";
import "./slider.css";

interface SliderProps {
    min: number;
    max: number;
    value: number;
    step: number;
    onChange: (value: number) => void;
}

function Slider({ min, max, value, step, onChange }: SliderProps) {
    const [sliderRange, setSliderRange] = useState(0);
    const sliderRef = useRef<HTMLInputElement | null>(null);

    function handleSliderInput() {
        if (!sliderRef.current) return;
        const newValue = Number(sliderRef.current.value);
        onChange(newValue);
        const range = max - min;
        const distance = newValue - min;
        setSliderRange((distance / range) * 100);
    }

    function handleNumberInput(e: React.ChangeEvent<HTMLInputElement>) {
        let newValue = Number(e.target.value);
        if (newValue < min) newValue = min;
        if (newValue > max) newValue = max;
        onChange(newValue);
        const range = max - min;
        const distance = newValue - min;
        setSliderRange((distance / range) * 100);
    }

    useEffect(() => {
        const range = max - min;
        const distance = value - min;
        setSliderRange((distance / range) * 100);
    }, [value, min, max]);

    return (
        <div className="range-slider">
            <div className="slider-value">
                <label className="text-sm font-medium text-white">Approximate word</label>
                <input
                    type="number"
                    value={value}
                    onInput={handleNumberInput}
                    min={min}
                    max={max}
                    className="number-input"
                    step={step}
                />
            </div>
            <div className="slider-container">
                <input
                    type="range"
                    onInput={handleSliderInput}
                    value={value}
                    className="slider"
                    min={min}
                    max={max}
                    ref={sliderRef}
                    step={step}
                />
                <div
                    className="slider-thumb"
                    style={{ left: `calc(${sliderRange}% - 0.5em)` }}
                ></div>
                <div
                    className="progress"
                    style={{ width: `${sliderRange}%` }}
                ></div>
            </div>
        </div>
    );
}

export default Slider;