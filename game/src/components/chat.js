import React, {useState} from 'react';


const Chat = (props) => {

    const [messages, setMessages] = useState('');
    const [messageToSend, setMessageToSend] = useState('');

    return(
        <div style={{flex: 1 }}>
            <div style={{whiteSpace: 'pre-wrap'}}>{props.messages}</div>
            <input type="text" value={messageToSend}
             onChange={(e) => setMessageToSend(e.target.value)} />

            <button onClick={() => props.sendMessage(messageToSend)}>Send</button>

        </div>
    );
}

export default Chat;