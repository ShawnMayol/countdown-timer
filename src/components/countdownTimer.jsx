import React, { useState } from "react";
import useCountdownTimer from "./counterStart.jsx";

const CountdownTimer = () => {
    const { time, startTimer, resetTimer, isActive, isEnded } =
        useCountdownTimer();
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    const handleStart = () => {
        const totalSeconds =
            Number(hours) * 3600 + Number(minutes) * 60 + Number(seconds);
        startTimer(totalSeconds);
    };

    const isStartButtonDisabled = () => {
        return !(
            Number(hours) > 0 ||
            Number(minutes) > 0 ||
            Number(seconds) > 0
        );
    };

    const handleReset = () => {
        resetTimer();
        setHours(0);
        setMinutes(0);
        setSeconds(0);
    };

    const handleHoursChange = (e) => {
        const value = Math.min(23, Math.max(0, Number(e.target.value)));
        setHours(value);
    };

    const handleMinutesChange = (e) => {
        const value = Math.min(59, Math.max(0, Number(e.target.value)));
        setMinutes(value);
    };

    const handleSecondsChange = (e) => {
        const value = Math.min(59, Math.max(0, Number(e.target.value)));
        setSeconds(value);
    };

    return (
        <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-900">
            <div className="bg-gray-800 shadow-lg rounded-lg p-8 flex flex-col items-center space-y-6">
                <h1 className="text-4xl font-bold text-white">
                    Countdown Timer
                </h1>
                <div className="flex space-x-4">
                    <div className="flex flex-col items-center">
                        <label
                            htmlFor="hours"
                            className="block text-sm font-medium text-gray-400"
                        >
                            Hours
                        </label>
                        <input
                            type="number"
                            id="hours"
                            value={hours}
                            onChange={handleHoursChange}
                            className="mt-1 block w-24 p-2 border border-gray-600 rounded-md bg-gray-700 text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="00"
                            max="23"
                        />
                    </div>
                    <div className="flex flex-col items-center">
                        <label
                            htmlFor="minutes"
                            className="block text-sm font-medium text-gray-400"
                        >
                            Minutes
                        </label>
                        <input
                            type="number"
                            id="minutes"
                            value={minutes}
                            onChange={handleMinutesChange}
                            className="mt-1 block w-24 p-2 border border-gray-600 rounded-md bg-gray-700 text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="00"
                            max="59"
                        />
                    </div>
                    <div className="flex flex-col items-center">
                        <label
                            htmlFor="seconds"
                            className="block text-sm font-medium text-gray-400"
                        >
                            Seconds
                        </label>
                        <input
                            type="number"
                            id="seconds"
                            value={seconds}
                            onChange={handleSecondsChange}
                            className="mt-1 block w-24 p-2 border border-gray-600 rounded-md bg-gray-700 text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="00"
                            max="59"
                        />
                    </div>
                </div>
                <div className="flex justify-between w-full">
                    <button
                        className="px-4 py-2 bg-gray-600 text-white font-semibold rounded-md shadow-md hover:bg-gray-500 transition duration-200"
                        onClick={handleReset}
                    >
                        Reset Timer
                    </button>
                    <button
                        className={`px-4 py-2 font-semibold rounded-md shadow-md transition duration-200 ${
                            isStartButtonDisabled()
                                ? "bg-blue-400 text-white cursor-not-allowed"
                                : "bg-blue-600 text-white hover:bg-blue-700"
                        }`}
                        onClick={handleStart}
                        disabled={isStartButtonDisabled()}
                    >
                        Start Timer
                    </button>
                </div>
                {isEnded ? (
                    <div className="text-3xl font-bold mt-4 text-red-600 animate-pulse">
                        Time's Up!
                    </div>
                ) : (
                    isActive && (
                        <div className="text-3xl font-semibold mt-4 text-white">
                            <span id="timerDisplay">{time}</span>
                        </div>
                    )
                )}
            </div>
        </div>
    );
};

export default CountdownTimer;
