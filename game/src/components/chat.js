import React, {useState, useEffect} from 'react';
import { Card, Button, Form, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Chat = (props) => {
    
    const [messages, setMessages] = useState('');
    const [messageToSend, setMessageToSend] = useState('');
    
    const sendMessage = () => {
        let message = messageToSend.trim();

        if (message){
            props.sendMessage(message);
            setMessageToSend('');
        }else{
            console.log('Message is empty!')
        }
        
    }
    
    useEffect(() => {
        const elem = document.getElementById('chat-message');
        elem.scrollTop = elem.scrollHeight
    }, [props.messages]);

    useEffect(() => {
        const sendKeyEvent = (e) => {

            const { key } = e;

            switch (key){
                case 'Enter':
                    if(!messageToSend.trim()){
                        e.preventDefault();
                        document.getElementById("sendTheMessage").click();
                    }
                    break;
            }
        };

        document.addEventListener('keyup', sendKeyEvent);

        return () => {
            document.removeEventListener('keyup', sendKeyEvent);
        };
         
    }, [])
    
    return(
        <Card style={{ marginRight: '2%'}} className=" bg-light container d-flex flex-column">
            <div id="chat-message" style={{whiteSpace: 'pre-wrap', overflowY: 'auto', height: '100vh'}}>
                <Form.Text style={{whiteSpace: 'pre-wrap', fontSize: '1.1rem'}}>{props.messages.join('\n')}</Form.Text>
            </div>
            <Container style={{margin: '1%'}} className="d-flex flex-column align-bottom">
                <div className="form align-bottom d-flex flex-row">
                    <Form.Control className="align-self-start" type="text" value={messageToSend}
                    onChange={(e) => setMessageToSend(e.target.value)} />

                        <Button id="sendTheMessage" disabled={!messageToSend.trim()} style={{marginLeft: '6px'}} className="align-self-end" onClick={sendMessage}>Send</Button>
                </div>
            </Container>    
        </Card>
    );
}


export { Chat };