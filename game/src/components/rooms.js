import React, { useContext } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import { GameContext, createRoom, quitRoom, joinRoom, startGame } from '../context/gameContext';

const Rooms = () => {

    const { player, rooms, room } = useContext(GameContext);
    return (
        <Card.Header style={{ width: '100%'}} className="d-flex align-self-center justify-content-center align-items-center bg-light" >
                {!player.room
                ?
                    <div style={{ display: 'grid', width: '100%'}}>
                        <Button className="button-default" variant="outline-secondary" onClick={createRoom}>Create Room</Button>
                        <Card.Title>
                            Rooms:
                        </Card.Title>
                        {Object.keys(rooms).map((key) =>
                        <Card.Text key={`room_${key}`}>
                            {rooms[key].name}
                            <Button style={{ margin: '0.3rem'}} size="sm" variant="outline-primary" onClick={() => joinRoom(key)} disabled={rooms[key].player1 && rooms[key].player2}>Join Room</Button>  
                        </Card.Text>)}
                    </div>
                :
                    <div style={{ width: '100%'}}>
                        <Card.Title>
                            {room!=undefined &&
                            room.name
                            }
                        </Card.Title>

                            <Button className="button-default" variant="outline-danger" onClick={quitRoom}>Quit Room</Button>
                            {rooms[player.room] && rooms[player.room].player1 && rooms[player.room].player2 
                                ?<Button className="button-default" variant="outline-success" onClick={() => startGame()}>Start Game</Button>
                                :<Card.Text>Waiting for another player to join. </Card.Text>
                                
                            }
                    </div>

                }
        </Card.Header>
    )
}

export default Rooms;