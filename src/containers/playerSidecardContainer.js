import React from 'react';
import PropTypes from 'prop-types';
import { PlayerSidecard } from '../components/playerSidecard';
import { playerID } from '../index';

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
            <div className={'sidebar'}>{ players }</div>
        )
    }
}

export default PlayerSidecardContainer;

PlayerSidecardContainer.propTypes = {
    players: PropTypes.object.isRequired
}