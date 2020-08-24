import React from 'react';

export default class WaitingRoom extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                This is the waiting room.
                {this.props.location.state.roomID}
            </div>
        )
    }
}

