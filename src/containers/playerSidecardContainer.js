import React from 'react';
import PropTypes from 'prop-types';
import { PlayerSidecard } from '../components/playerSidecard';
import { playerID } from '../index';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

class PlayerSidecardContainer extends React.Component {
    render() {
        const players = Object.keys(this.props.players)
                                    .filter(player => player !== playerID)
                                    .map((player, index) =>
            <div className={'sidecard'}
                 key={'player' + player}
            >
                <PlayerSidecard playerID={player}
                                numOfCards={this.props.players[player].hand.length}/>
            </div>
        )
        return (
            <Card style={{ width: '18rem', border: '0' }}>
                <ListGroup variant="flush">
                    {players}
                </ListGroup>
            </Card>
        )
    }
}

export default PlayerSidecardContainer;

PlayerSidecardContainer.propTypes = {
    players: PropTypes.object.isRequired
}