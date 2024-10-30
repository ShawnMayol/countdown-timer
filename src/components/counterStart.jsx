import { useState, useEffect } from "react";

const useCountdownTimer = () => {
    const [time, setTime] = useState("00:00:00");
    const [isActive, setIsActive] = useState(false);
    const [totalSeconds, setTotalSeconds] = useState(0);
    const [intervalId, setIntervalId] = useState(null);
    const [isEnded, setIsEnded] = useState(false);

    const startTimer = (seconds) => {
        setTotalSeconds(seconds);
        setIsActive(true);
        setIsEnded(false);
        setTime(formatTime(seconds));

        clearInterval(intervalId);

        const id = setInterval(() => {
            setTotalSeconds((prev) => {
                if (prev <= 0) {
                    clearInterval(id);
                    setIsActive(false);
                    setIsEnded(true);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        setIntervalId(id);
    };

    const resetTimer = () => {
        clearInterval(intervalId);
        setIsActive(false);
        setIsEnded(false);
        setTotalSeconds(0);
        setTime("00:00:00");
    };

    const formatTime = (seconds) => {
        const hours = String(Math.floor(seconds / 3600)).padStart(2, "0");
        const minutes = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
        const secondsLeft = String(seconds % 60).padStart(2, "0");
        return `${hours}:${minutes}:${secondsLeft}`;
    };

    useEffect(() => {
        setTime(formatTime(totalSeconds));
    }, [totalSeconds]);

    useEffect(() => {
        return () => clearInterval(intervalId);
    }, [intervalId]);

    return { time, startTimer, resetTimer, isActive, isEnded };
};

export default useCountdownTimer;
