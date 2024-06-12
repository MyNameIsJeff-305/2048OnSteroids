import Heading from '../Heading'
import React, { useState, useEffect } from 'react';
import Board from '../../GameLogic';
import '../../App';
import './GameBoard.css'

const GameBoard = () => {
    const [boardInstance] = useState(new Board());
    const [board, setBoard] = useState(boardInstance.board);
    const [score, setScore] = useState(boardInstance.score);

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
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    //This is for getting the format from css
    const getTileClass = (value) => {
        return value === 0 ? 'cell empty' : `cell cell-${value}`;
    };

    return (
        <div className='container'>
            <Heading board={board}/>
            {/* <h2>Score: {score}</h2> */}
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
