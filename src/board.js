import React from "react";
import Square from './square';

function Board ({squares}) {
    
    const renderSquare = (i) => {
        const value = squares[i];
        const tileClassName = value ? `tile-inner tile-${value}` : '';
        return <Square className={tileClassName} value={value} key={i} />;
    }

    return (
        <div className='grid-container' >
            {[0, 4, 8, 12].map(rowStart => (
                <div className='grid-row' key={rowStart}>
                    {[0, 1, 2, 3].map(i => renderSquare(i + rowStart))}
                </div>
            ))}
        </div>
    )
}
export default Board;