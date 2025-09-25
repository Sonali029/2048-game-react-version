import React, { useEffect, useState, useRef } from "react";
import Board from './board';
import { processLine, getLines, setLines, placeRandomTile, BOARD_SQUARE } from "./utils.gameLogic";

function Game() {
    const [squares, setSquares] = useState(Array(BOARD_SQUARE).fill(null));
    const [score, setScore] = useState(0);
    const [bestScore, setBestScore] = useState(0);
    const [isGameOver, setIsGameOver] = useState(false);
    const BEST_SCORE_KEY = 'bestScore2048';

    const scoreAnimRef = useRef(null);
    const scoreDisplayRef = useRef(null);

    // Initialize the board
    const initializeBoard = () => {
        setIsGameOver(false);
        setScore(0);
        let newSquares = Array(BOARD_SQUARE).fill(null);
        newSquares = placeRandomTile(newSquares);
        newSquares = placeRandomTile(newSquares);
        setSquares(newSquares);
    }
    
    useEffect(() => {
        const storedScore = localStorage.getItem(BEST_SCORE_KEY);
        if (storedScore) {
            setBestScore(Number(storedScore));
        }
        initializeBoard();
    }, []);

    useEffect(() => {
        if (score > bestScore) {
            setBestScore(score);
            localStorage.setItem(BEST_SCORE_KEY, score);
        }
    }, [score, bestScore]);

    const updateScore = (points) => {
        if (points === 0) return;

        setScore(prevScore => {
            const newScore = prevScore + points;
            
            if (scoreAnimRef.current && scoreDisplayRef.current) {
                const scorePos = scoreDisplayRef.current.getBoundingClientRect();
                
                scoreAnimRef.current.innerHTML = `+${points}`;
                scoreAnimRef.current.style.top = `${scorePos.top}px`;
                scoreAnimRef.current.style.left = `${scorePos.left}px`;
                
                scoreAnimRef.current.classList.remove('score-animation');
                requestAnimationFrame(() => {
                    scoreAnimRef.current.classList.add('score-animation');
                });
            }
            return newScore;
        });
    };
    
    const checkGameOver = (board) => {
        if (board.includes(null)) return false;

        const directions = ['up', 'down', 'left', 'right'];
        for (const dir of directions) {
            if (attemptMove(board, dir).boardChanged) return false;
        }
        return true;
    };

    const attemptMove = (board, direction) => {
        const lines = getLines(board, direction);
        let boardChanged = false;
        let pointsGained = 0;

        const processedLines = lines.map(line => {
            const originalLine = [...line];
            
            if (direction === 'right' || direction === 'down') originalLine.reverse();

            const { result, points } = processLine(originalLine);
            pointsGained += points;
            
            if (JSON.stringify(originalLine) !== JSON.stringify(result)) {
                boardChanged = true;
            }
            
            if (direction === 'right' || direction === 'down') result.reverse();
            
            return result;
        });

        const newBoard = setLines(processedLines, direction);
        return { newBoard, boardChanged, pointsGained };
    };

    const moveTiles = (direction) => {
        if (isGameOver) return;

        const { newBoard, boardChanged, pointsGained } = attemptMove(squares, direction);

        if (boardChanged) {
            updateScore(pointsGained);
    
            const finalBoard = placeRandomTile(newBoard);
            setSquares(finalBoard);

            if (checkGameOver(finalBoard)) {
                setIsGameOver(true);
            }
        }
    };

    const handleKeyDown = (event) => {
        if (isGameOver) return;
        
        switch (event.key) {
            case "ArrowUp":
            case "w":
                event.preventDefault();
                moveTiles('up');
                break;
            case "ArrowDown":
            case "s":
                event.preventDefault();
                moveTiles('down');
                break;
            case "ArrowLeft":
            case "a":
                event.preventDefault();
                moveTiles('left');
                break;
            case "ArrowRight":
            case "d":
                event.preventDefault();
                moveTiles('right');
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [handleKeyDown]);
    
    const CurrentScore = () => (
        <div class = "game-score">
        <div ref={scoreDisplayRef} className="score">
            SCORE
            <div className="number"> {score} </div>
        </div>
        </div>
    );

    const BestScore = () => (
        <div class = "game-score">
        <div className="score">
            BEST
            <div className="number"> {bestScore}</div>
        </div>
        </div>
    );
    
    const GameImage = () => (
        <div className='title'>
            <img src='https://www.2048.org/logo.png' alt='2048 Logo' />
        </div>
    );

    const Heading = () => (
        <div className='heading'>
            <GameImage />
            <div className='score-container'>
                <CurrentScore />
                <BestScore />
            </div>
        </div>
    );
    
    const GameIntro = () => (
        <div className='game-rule'>
            Join numbers to get to the <strong> 2048 tile!</strong>
        </div>
    );

    const NewGameButton = () => (
        <div className='restart-game' onClick={initializeBoard}>
            New Game
        </div>
    );
    
    const GameOverOverlay = () => (
        <div className='game-over-overlay'>
            <div className='game-over-text'>Game Over</div>
            <div className='try-again-button' onClick={initializeBoard}>Try Again</div>
        </div>
    );

    return (
        <div>
            <div ref={scoreAnimRef} className='score-animation-element'></div>

            <div className='container'>
                <Heading />
                <div className='game-intro'>
                    <GameIntro />
                    <NewGameButton />
                </div>
                <div className='game-container'>
                    <Board squares={squares} />
                    {isGameOver && <GameOverOverlay />}
                </div>
            </div>
        </div>
    );
}

export default Game;