import Heading from '../Heading'
import React, { useState, useEffect } from 'react';
import Board from '../../GameLogic';
import '../../App';
import './GameBoard.css'

const GameBoard = () => {
    const [boardInstance] = useState(new Board());
    const [board, setBoard] = useState(boardInstance.board);
    const [score, setScore] = useState(boardInstance.score);
    const [bestScore, setBestScore] = useState(() => parseInt(localStorage.getItem('bestScore') || 0))
    const [gameOver, setGameOver] = useState(false);
    const [gameWon, setGameWon] = useState(false);

    useEffect(() => {
        boardInstance.initializeBoard();
        setBoard([...boardInstance.board]);
    }, [boardInstance]);

    const handleKeyDown = (e) => {
        switch (e.key) {
            case 'ArrowUp':
                boardInstance.moveYAxis(0);
                break;
            case 'ArrowDown':
                boardInstance.moveYAxis(1);
                break;
            case 'ArrowLeft':
                boardInstance.moveXAxis(0);
                break;
            case 'ArrowRight':
                boardInstance.moveXAxis(1);
                break;
            default:
                return;
        }
        setBoard([...boardInstance.board]);
        setScore(boardInstance.score);
        if (boardInstance.score > bestScore) {
            setBestScore(boardInstance.score);
            localStorage.setItem('bestScore', boardInstance.score);
        }

        if (boardInstance.didIWon()) {
            setGameWon(true);
        }
        if (boardInstance.didILost()) {
            setGameOver(true);
        }
    };

    const handleKeyUp = (e) => {
        switch(e.key) {
            case 'ArrowUp':
                boardInstance.didIWon();
                boardInstance.didILost();
                break;
            case 'ArrowDown':
                boardInstance.didIWon();
                boardInstance.didILost();
                break;
            case 'ArrowLeft':
                boardInstance.didIWon();
                boardInstance.didILost();
                break;
            case 'ArrowRight':
                boardInstance.didIWon();
                boardInstance.didILost();
                break;
            default:
                return;
        }
    }

    const resetGame = () => {
        boardInstance.initializeBoard();
        setBoard([...boardInstance.board]);
        setScore(boardInstance.score);
        setGameOver(false);
        setGameWon(false);
    }

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp)
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp)
        };
    }, []);

    //This is for getting the format from css
    const getTileClass = (value) => {
        return value === 0 ? 'cell empty' : `cell cell-${value}`;
    };

    return (
        <div className='container'>
            <Heading score={score} bestScore={bestScore} onNewGame={resetGame}/>
            <div className="board">
                {board.map((row, rowIndex) => (
                    <React.Fragment key={rowIndex}>
                        {row.map((cell, cellIndex) => (
                            <div key={cellIndex} className={getTileClass(cell)}>
                                {cell !== 0 ? cell : ''}
                            </div>
                        ))}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default GameBoard;
