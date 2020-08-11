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
            .map((player, index) => {
                const playerObject = this.props.players[player];
                return (
                    <div className={'sidecard'}
                         key={'player' + player}
                    >
                        <PlayerSidecard
                            name={playerObject.name}
                            numOfCards={playerObject.hand.length}
                            active={this.props.current === player}
                            alive={playerObject.alive}
                        />
                    </div>
                )
            }
        );

        return (
            <Card style={{ width: '18rem', border: '0', flex: '1' }}>
                <ListGroup variant="flush">
                    {players}
                </ListGroup>
            </Card>
        );
    }
}

export default PlayerSidecardContainer;

PlayerSidecardContainer.propTypes = {
    players: PropTypes.object.isRequired,
    current: PropTypes.string,
}