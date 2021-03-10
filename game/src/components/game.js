import React, { useEffect, useContext } from 'react';
import SVG, {Circle, Rect, Line} from 'react-svg-draw';
import { GameContext, gameLoaded, quitRoom } from '../context/gameContext';

const Game = () => {

    const { match } = useContext(GameContext);
    const { gameConfig, ball, message } = match;

    useEffect(() => {
        gameLoaded();
    }, []);



    return (
    
        <div>
        
            <SVG width={gameConfig.width} height={gameConfig.height}>
                <Rect
                    x="0" 
                    y="0"
                    width={gameConfig.width}
                    height={gameConfig.height}
                    style={{fill: '#000'}}
                />
                <Line
                    x1={gameConfig.width / 2}
                    y1="0"
                    x2={gameConfig.width / 2}
                    y2={gameConfig.height}
                    stroke-dasharray="5,5"
                    stroke-width="5"
                    style={{stroke: '#ffffff80'}}
                />
                <text 
                    x={gameConfig.width / 2 - 20 }
                    y="45"
                    style={{direction: 'rtl', fill: '#ffffffB3', fontSize: '50px'}}
                >
                {match.score1}
                </text>
                <text 
                    x={gameConfig.width / 2 + 20 }
                    y="45"
                    style={{ fill: '#ffffffB3', fontSize: '50px'}}
                >
                {match.score2}
                </text>
                {ball && 
                    <Circle
                        cx={ball.x}
                        cy={ball.y}
                        r={ball.width}
                        style={{fill: '#ffffff'}}
                    />
                }
            </SVG>
            {message &&
                <div className="game-message">
                    <h4>{message}</h4>
                    <button onClick={quitRoom}>Back</button>
                </div>
            }
        </div>
    )
    


}

export { Game };