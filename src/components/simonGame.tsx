"use client";
import { useEffect, useState, useRef, RefObject } from "react";
import GameButton from "./gameButton";

const colors = ["green", "red", "blue", "yellow"];

export default function SimonGame() {
    const [sequence, setSequence] = useState<string[]>([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [playingIndex, setPlayingIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [highScores, setHighScores] = useState<number[]>([]);

    const greenRef = useRef<HTMLButtonElement>(null);
    const redRef = useRef<HTMLButtonElement>(null);
    const yellowRef = useRef<HTMLButtonElement>(null);
    const blueRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const savedScores = JSON.parse(localStorage.getItem('highScores') || '[]') as number[];
        setHighScores(savedScores);
    }, []);

    const addNewColor = () => {
        const newColor = colors[Math.floor(Math.random() * 4)];
        const newSequence: string[] = [...sequence, newColor];
        setSequence(newSequence);
    };

    const resetGame = () => {
        updateHighScores(score);
        setSequence([]);
        setIsPlaying(false);
        setPlayingIndex(0);
        setScore(0);
    };

    const handleNextLevel = () => {
        if (!isPlaying) {
            setIsPlaying(true);
            addNewColor();
        }
    };

    const handleColorClick = (e: any) => {
        if (isPlaying) {
            e.target.classList.add("opacity-50");

            setTimeout(() => {
                e.target.classList.remove("opacity-50");
                const clickColor = e.target.getAttribute("color");

                if (sequence[playingIndex] === clickColor) {
                    if (playingIndex === sequence.length - 1) {
                        setTimeout(() => {
                            setPlayingIndex(0);
                            addNewColor();
                            setScore(prevScore => prevScore + 1);
                        }, 250);
                    } else {
                        setPlayingIndex(playingIndex + 1);
                    }
                } else {
                    alert(`Game Over! Your score is ${score}.`);
                    resetGame();
                }
            }, 250);
        }
    };

    const updateHighScores = (newScore: number) => {
        const newHighScores = [...highScores, newScore].sort((a, b) => b - a).slice(0, 10);
        setHighScores(newHighScores);
        localStorage.setItem('highScores', JSON.stringify(newHighScores));
    };

    useEffect(() => {
        if (sequence.length > 0) {
            const showSequence = (index = 0) => {
                let ref: RefObject<HTMLButtonElement> | null = null;

                if (sequence[index] === "green") ref = greenRef;
                if (sequence[index] === "red") ref = redRef;
                if (sequence[index] === "yellow") ref = yellowRef;
                if (sequence[index] === "blue") ref = blueRef;

                if (ref && ref.current) {
                    ref.current.classList.add("brightness-[2.5]");

                    setTimeout(() => {
                        ref.current?.classList.remove("brightness-[2.5]");
                        if (index < sequence.length - 1) showSequence(index + 1);
                    }, 250);
                }
            };

            showSequence();
        }
    }, [sequence]);

    return (
        <div className="flex flex-col justify-center items-center bg-neutral-800 text-white min-h-screen p-4">
            <div className="relative flex flex-col justify-center items-center space-y-4 sm:space-y-8">
                <div className="flex space-x-4 sm:space-x-8">
                    <GameButton border="rounded-tl-full" bg="bg-green-500" ref={greenRef} onClick={handleColorClick} color="green" />
                    <GameButton border="rounded-tr-full" bg="bg-red-500" ref={redRef} onClick={handleColorClick} color="red" />
                </div>

                <div className="flex space-x-4 sm:space-x-8">
                    <GameButton border="rounded-bl-full" bg="bg-yellow-500" ref={yellowRef} onClick={handleColorClick} color="yellow" />
                    <GameButton border="rounded-br-full" bg="bg-blue-500" ref={blueRef} onClick={handleColorClick} color="blue" />
                </div>

                <button className="absolute bg-neutral-900 text-white text-xl sm:text-2xl font-bold rounded-full w-[100px] sm:w-[150px] h-[100px] sm:h-[150px] duration-200 hover:scale-105" onClick={handleNextLevel}>
                    {sequence.length === 0 ? "Play" : sequence.length}
                </button>
            </div>
            <div className="mt-8 text-white p-4 bg-neutral-700 rounded-lg shadow-lg max-w-md w-full">
                <div className="text-2xl font-semibold mb-4 text-center">Current Score: {score}</div>
                <div className="text-xl font-semibold mb-2 text-center">Top 10 High Scores:</div>
                <ol className="list-decimal list-inside text-lg">
                    {highScores.map((highScore, index) => (
                        <li key={index} className="my-1">{highScore}</li>
                    ))}
                </ol>
            </div>
        </div>
    );
}
