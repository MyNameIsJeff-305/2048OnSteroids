import './Heading.css'

const Heading = ({board}) => {
    return (
        <div className="heading">
            <h1 className="title">2048</h1>
            <div className="scores-container">
                <div className="score-container">
                    <h4>SCORE</h4>
                    <h3>{board.score}</h3>
                </div>
                <div className="best-container">
                    <h4>BEST</h4>
                    <h3>{board.score === 0 ? 0 : board.score}</h3>
                </div>
                <div className='above-game'>
                    <p className='game-intro'>Join the tiles, get to <strong>2048!</strong></p>
                </div>
            </div>
        </div>
    )
};

export default Heading;
