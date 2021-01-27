import React, {useContext} from 'react';
import PlayerList from './playerList';
import Chat from './chat';
import {GameContext, sendMessage, createRoom, quitRoom, joinRoom} from '../context/gameContext';
import { Card,  Button, Form, Container, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Pong = () => {
    const { isConnected, players, messages, player, rooms } = useContext(GameContext)
    
    return(
        <div className="d-flex flex-row" style={{margin: '2vh auto', width: '100%', height: '95vh'}}>                
                <Container style={{ width: '24%', marginLeft: '2%', height: '95vh'}} className="align-self-start align-items-center">
                    <PlayerList players={players}/>
                </Container>
                <Container style={{ height: '95vh'}}className="d-block align-self-center align-items-center" >
                                {!isConnected && 
                                <Alert variant="info">Connecting...</Alert>
                            }
                            {!player.room &&
                                <div>
                                    <Button onClick={createRoom}>Create Room</Button>
                                    {Object.keys(rooms).map((key) =>
                                    <Form.Text key={`room_${key}`}>
                                        {rooms[key].name}
                                        <Button onClick={() => joinRoom(key)} disabled={rooms[key].player1 && rooms[key].player2}>Join Room</Button>  
                                    </Form.Text>)}
                                </div>
                            
                            }
                            {
                                player.room 
                                && <div>
                                        {rooms[player.room] && rooms[player.room].player1 && rooms[player.room].player2 
                                            ?<Button onClick={quitRoom}>Start Game</Button>
                                            :<>Waiting for another player to join. </>
                                            
                                        }
                                        <Button onClick={quitRoom}>Quit Room</Button>
                                    </div>

                            }
                        <Chat sendMessage={sendMessage} messages={messages}/>
                    </Container>
        </div>
    );
}

export default Pong;