import './Heading.css'

const Heading = ({ score }) => {
    return (
        <div className='heading'>
            <div className='left-column'>
                <h1 className='title'>2048</h1>
                <p className='game-intro'>Join the tiles, get to <strong>2048!</strong></p>
                <a href='/' className='how-to-play-link'>How to play →</a>
            </div>
            <div className='rigth-column'>
                <div className="scores-container">
                    <div className="score-container">
                        <h4>SCORE</h4>
                        <h3>{score}</h3>
                    </div>
                    <div className="best-container">
                        <h4>BEST</h4>
                        <h3>{score === 0 ? '0' : score}</h3>
                    </div>
                </div>
                <button className='restart-button'>New Game</button>
            </div>
        </div>
    )
};

export default Heading;
