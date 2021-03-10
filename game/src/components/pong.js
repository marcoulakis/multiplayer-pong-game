import React, {useContext} from 'react';
import PlayerList from './playerList';
import Chat from './chat';
import { GameContext, sendMessage } from '../context/gameContext';
import { Card, Container, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Rooms from './rooms'
import { Game } from './game';

const Pong = () => {
    const { isConnected, players, messages, match } = useContext(GameContext)
    
    return(
        <div className="d-flex flex-row bg-light" style={{margin: '2vh auto', width: '100%', height: '95vh'}}> 
            {!isConnected && 
                <div className="fixed-top" style={{ alignItems: 'center', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center'}}>
                    <Alert style={{margin: '1.2vh', textAlign: 'center'}} variant="info">Connecting...</Alert>
                </div>
            }

            {match.status === 'START'
                &&
                <div><Game/></div>

            }

            {match.status === 'PLAY'
                &&
                <div><Game/></div>

            }

            {match.status !== 'PLAY'   
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