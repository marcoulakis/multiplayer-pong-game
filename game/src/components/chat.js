import React, {useState} from 'react';
import { Button, Form, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Chat = (props) => {

    const [messages, setMessages] = useState('');
    const [messageToSend, setMessageToSend] = useState('');

    return(
        <Container className="d-flex flex-column">
            <Form.Text style={{whiteSpace: 'pre-wrap'}}>{props.messages.join('\n')}</Form.Text>
            <Container className="d-flex flex-column align-bottom">
                <Form className="align-bottom d-flex flex-row">
                    <Form.Control className="align-self-start" type="text" value={messageToSend}
                    onChange={(e) => setMessageToSend(e.target.value)} />

                        <Button style={{marginLeft: '6px'}} className="align-self-end" onClick={() => props.sendMessage(messageToSend)}>Send</Button>
                </Form>
            </Container>    
        </Container>
    );
}

export default Chat;