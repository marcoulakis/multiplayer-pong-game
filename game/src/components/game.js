import React, { useEffect, useContext } from 'react';
import SVG, {Circle, Rect, Line} from 'react-svg-draw';
import { GameContext, gameLoaded, quitMatch, sendKey } from '../context/gameContext';
import { Button } from 'react-bootstrap';

const Game = () => {

    const { match } = useContext(GameContext);
    const { gameConfig, ball, message, player1, player2 } = match;

    useEffect(() => {
        gameLoaded();

        const sendKeyEvent = (e) => {

            const { key, type } = e;

            switch (key){
                case 'ArrowUp':
                case 'ArrowDown':
                    sendKey(type,key);
                    e.preventDefault();
                    break;
            }
        };
        

        document.addEventListener('keydown', sendKeyEvent);
        document.addEventListener('keyup', sendKeyEvent);

        return () => {
            document.removeEventListener('keydown', sendKeyEvent);
            document.removeEventListener('keyup', sendKeyEvent);
        };
         
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
                {player1 &&
                    <Rect
                        x={player1.x.toString()}
                        y={player1.y.toString()}
                        width={player1.width.toString()}
                        height={player1.height.toString()}
                        style={{fill: '#ffffff'}}
                    />
                }
                {player2 &&

                        <Rect
                            x={player2.x.toString()}
                            y={player2.y.toString()}
                            width={player2.width.toString()}
                            height={player2.height.toString()}
                            style={{fill: '#ffffff'}}
                        />
                }
            </SVG>
            {message &&
                <div className="game-message">
                    <h4>{message}</h4>
                    <Button className="button-default" variant="outline-danger" onClick={quitMatch}>Quit</Button>
                </div>
            }
        </div>
    )
    


}

export { Game };