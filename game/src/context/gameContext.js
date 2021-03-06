import React, {useReducer, useEffect} from 'react';
import socketClient from 'socket.io-client';

const GameContext = React.createContext();

const reducer = (state, action) => {
    switch (action.type) {
        case 'CONNECTED':
            return {
                ...state,
                isConnected: action.payload
            };
        case 'PLAYERS':
            return {
                ...state,
                players: action.payload
            }
        case 'PLAYER':
            return {
                ...state,
                player: action.payload
            }
        case 'ROOM':
            return {
                ...state,
                room: state.rooms[state.players[action.payload].room]
            }
        case 'ROOMS':
            return {
                ...state,
                rooms: action.payload
            }
        case 'ADD_MESSAGES':
            return {
                ...state,
                messages: [...state.messages, action.payload]
            }
        case 'MATCH':
            return {
                ...state,
                match: action.payload
            }
        default:
            return state;
    }
};

const socket = socketClient('http://localhost:4000', {
    autoConnect: false,
});


const initialState ={
    isConnected: false,
    player: {},
    room: {},
    rooms: {},
    players: {},
    messages: [],
    match: {}
}

const GameProvider = (props) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    
    useEffect(() =>{
        socket.on('connect', () => {
            dispatch({type: 'CONNECTED', payload: true});
        });
        socket.on('disconnect', () => {
            dispatch({type: 'CONNECTED', payload: false});

        })
        socket.on('PlayerRefresh', (players) => {
            dispatch({type: 'PLAYERS', payload: players});
            dispatch({type: 'PLAYER', payload: players[socket.id]});

        })
        socket.on('ReceiveMessage', (receivedMessage) =>{
            dispatch({type: 'ADD_MESSAGES', payload: receivedMessage});
        });
        socket.on('RoomsRefresh', (players) => {
            dispatch({type: 'ROOMS', payload: players});
            dispatch({type: 'ROOM', payload: socket.id});
        })
        socket.on('MatchRefresh', (match) => {
            dispatch({type: 'MATCH', payload: match});
        })
        socket.open();
    }, []);

    
    return(
        <GameContext.Provider value={state}>
            {props.children}
        </GameContext.Provider>
    );
}

const sendMessage = (message) => {
    socket.emit('SendMessage', message);
}

const createRoom = () => {
    socket.emit('CreateRoom');
}

const quitRoom = () => {
    socket.emit('QuitRoom');
}

const quitMatch = () => {
    socket.emit('QuitMatch');
}

const startGame = (roomId) => {
    socket.emit('StartGame', roomId);
}

const joinRoom = (roomId) => {
    socket.emit('JoinRoom', roomId);
}
const gameLoaded = () => {
    socket.emit('GameLoaded')
}

let lastTypeEmited = undefined;
const sendKey = (type, key) => {
    if(lastTypeEmited === type){
        return;
    }

    lastTypeEmited = type;
    socket.emit('SendKey', {type: type, key: key})
};

export {GameContext, 
    GameProvider, 
    sendMessage, 
    createRoom, 
    quitRoom,
    quitMatch,
    joinRoom,
    startGame,
    gameLoaded, 
    sendKey
};