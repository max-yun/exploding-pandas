import React from 'react';
import { Card } from '../components/card';
import PropTypes from 'prop-types';

class CardContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            flipped: true,
            card: null
        }
    }
    
    dragStart = e => {
        const target = e.target;
        e.dataTransfer.setData('cardID', target.id);
        setTimeout(() => {
            target.style.display = "none";
        }, 0);
    }

    dragOver = e => {
        e.stopPropagation();
    }

    render() {
        return (
            <Card id={this.props.id}
                  onDragStart={this.dragStart}
                  onDragOver={this.dragOver}
                  flipped={true}
                  card={this.props.name}
            />
        )
    }
}

export default CardContainer;

CardContainer.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string
}