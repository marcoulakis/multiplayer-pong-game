import React, {useEffect, useState} from 'react';
import socketClient from 'socket.io-client';
import PlayerList from './playerList';
import Chat from './chat';

const socket = socketClient('http://localhost:4000');
const Pong = () => {

    const [players, setPlayers] = useState({});
    const [message, setMessages] = useState('');
    
    useEffect(() =>{
        socket.on('connect', () => {
            console.log('Connected!');
        });

    }, []);

    useEffect(() =>{
        socket.on('PlayerRefresh', (players) => {
            setPlayers(players);
        })

    }, [players]);

    useEffect(() =>{
        socket.on('ReceiveMessage', (receivedMessage) =>{
            setMessages(message + receivedMessage +'\n\n')
        })

    }, [message]);
    
    const sendMessage = (message) => {
        socket.emit('SendMessage', message);
    }

    return(
        <div style={{display: 'flex', flexDirection: 'row'}}>
            <PlayerList players={players}/>
            <Chat sendMessage={sendMessage} messages={message}/>
        </div>
    );
}

export default Pong;