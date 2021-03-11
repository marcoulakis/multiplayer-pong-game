import React  from 'react';
import { Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const PlayerList = (props) => {

    return(
        <div>
            <Card.Body className="bg-light">
                <Card.Title>Players List:</Card.Title>
                {Object.keys(props.players)
                    .map((key) => (
                        <Card.Text key={key}>{props.players[key].name}</Card.Text>
                    ))
                }
            </Card.Body>
        </div>
    );
}

export default PlayerList;