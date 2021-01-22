import React, {useState} from 'react';


const PlayerList = (props) => {
    const [players, setPlayers] = useState({});

    return(
        <div>
            {Object.keys(props.players)
                .map((key) => (
                    <div key={key}>{props.players[key].name}</div>
                ))
            }
        </div>
    );
}

export default PlayerList;