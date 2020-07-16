import React from 'react';
import '../css/playArea.css'

const PlayArea = React.forwardRef((props, ref) => (
    <div id={'play-area'}>
        <div ref={ref} id={'play-pile'}>
            { props.children }
        </div>
    </div>
));

export default PlayArea;