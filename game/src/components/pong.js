import React, {useContext} from 'react';
import PlayerList from './playerList';
import Chat from './chat';
import {GameContext, sendMessage, createRoom, quitRoom, joinRoom} from '../context/gameContext';


const Pong = () => {
    const { isConnected, players, messages, player, rooms } = useContext(GameContext)
    
    return(
        <>
             {!isConnected && 
                <div>Connecting...</div>
            }
            <div>
                <div style={{marginBottom: '20xp'}}>
                    {!player.room &&
                        <div>
                            <button onClick={createRoom}>Create Room</button>
                            {Object.keys(rooms).map((key) =>
                             <div key={`room_${key}`}>
                                 {rooms[key].name}
                                 <button onClick={() => joinRoom(key)} disabled={rooms[key].player1 && rooms[key].player2}>Join Room</button>  
                            </div>)}
                        </div>
                    
                    }
                    {
                        player.room 
                        && <div>
                                {rooms[player.room] && rooms[player.room].player1 && rooms[player.room].player2 
                                    ?<button onClick={quitRoom}>Start Game</button>
                                    :<>Waiting for another player to join. </>
                                    
                                }
                                <button onClick={quitRoom}>Quit Room</button>
                            </div>

                    }
                </div>

                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <PlayerList players={players}/>
                    <Chat sendMessage={sendMessage} messages={messages}/>
                </div>
            </div>
        </>
    );
}

export default Pong;