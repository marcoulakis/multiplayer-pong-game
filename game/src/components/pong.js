import React, {useContext, useState} from 'react';
import PlayerList from './playerList';
import { Chat } from './chat';
import { GameContext, sendMessage, quitMatch } from '../context/gameContext';
import { Card, Container, Alert, Toast, ToastHeader } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import Rooms from './rooms'
import { Game } from './game';

const Pong = () => {
    const { isConnected, players, messages, match } = useContext(GameContext)
    const { message } = match;

    const [showA, setShowA] = useState(true);
    const toggleShowA = () => setShowA(!showA);
    console.log(message);
    return(
        <div className="d-flex flex-row bg-light" style={{margin: '2vh auto', width: '100%', height: '95vh'}}> 
            {!isConnected && 
                <div className="fixed-top" style={{ alignItems: 'center', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center'}}>
                    <Alert style={{margin: '1.2vh', textAlign: 'center'}} variant="info">Connecting...</Alert>
                </div>
            }

            {match.status === 'START'
                &&
                <div className="d-flex flex-row justify-content-center align-items-center flex-wrap game-loaded-container" ><Game/></div>

            }

            {match.status === 'PLAY'
                &&
                <div className="d-flex flex-row justify-content-center align-items-center flex-wrap game-loaded-container" ><Game/></div>

            }

            {message
            &&
                <>
                    <Toast className="toast game-message position-absolute ">
                        <div className="toast-header" style={{ justifyContent: 'space-between' }}>
                            <strong className="me-auto">Game</strong>
                            <small className="text-muted">just now</small>
                        </div>
                        <Toast.Body className="toast-body">
                            {message}
                        </Toast.Body>
                    </Toast>
                </>
            }               
            {match.status !== 'PLAY' && match.status !== 'START'   
                &&
                <>
                    <Container style={{ width: '35%', marginLeft: '2%', height: '95vh'}} className="align-self-start align-items-center bg-light">
                        <Card className="justify-content-start bg-light" style={{height: '95vh'}}>
                            <Rooms/>
                            <PlayerList players={players}/>
                        </Card>
                    </Container>
                    <Chat sendMessage={sendMessage} messages={messages}/>
                </>
            
            }
        </div> 
        
    );
}

export default Pong;