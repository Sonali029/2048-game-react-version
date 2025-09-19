import react from "react";
import Square from './square'

function Board ({value}) {
    
    const renderSquare = (i) => {
        const square = value[i];
        let tileClassName = square ? `tile-inner tile-${square}` : ' ';
        return <Square className = {tileClassName} value = {square} key = {i} />
    }

    return (
        <div className = 'grid-container' >
            {[0, 4, 8, 12]. map(rowStart => (
                <div className = 'grid-row' key = {rowStart}>
                    {[0, 1, 2, 3].map(i => renderSquare(i + rowStart))}
                </div>
            ))}
        </div>
    )
}
export default Board