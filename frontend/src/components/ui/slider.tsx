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
    const [inputValue, setInputValue] = useState<string>(String(value))
    const [error, setError] = useState<string | null>(null)
    const [sliderRange, setSliderRange] = useState(0);
    const sliderRef = useRef<HTMLInputElement | null>(null);

    function handleSliderInput() {
        if (!sliderRef.current) return;

        const newValue = Number(sliderRef.current.value);
        setInputValue(String(newValue))
        setError(null)
        onChange(newValue);

        const range = max - min;
        const distance = newValue - min;
        setSliderRange((distance / range) * 100);
    }

    function handleNumberInput(e: React.ChangeEvent<HTMLInputElement>) {
        const raw = e.target.value
        setInputValue(raw)

        const numeric = Number(raw)

        if (numeric == 0) {
            setError("Please enter a number")
            return
        }

        if (numeric < min || numeric > max) {
            setError(`Sorry, enter a number between ${min} and ${max}`)
            return
        }

        setError(null)
        onChange(numeric)
    }

    useEffect(() => {
        setInputValue(String(value))

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
                    value={inputValue}
                    onInput={handleNumberInput}
                    min={min}
                    max={max}
                    className="number-input"
                    step={step}
                />
                {error && (
                    <p className="text-sm text-red-400">
                        {error}
                    </p>
                )}
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