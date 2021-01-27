import React, {useState} from 'react';
import { Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const PlayerList = (props) => {
    const [players, setPlayers] = useState({});

    return(
        <Card className="justify-content-start" style={{height: '95vh'}}>
            <Card.Body>
                <Card.Title>Players List:</Card.Title>
                {Object.keys(props.players)
                    .map((key) => (
                        <Card.Text key={key}>{props.players[key].name}</Card.Text>
                    ))
                }
            </Card.Body>
        </Card>
    );
}

export default PlayerList;