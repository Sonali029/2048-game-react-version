import React from "react";

function Square ({className, value}) {
    return (
        <div className = {`square ${className}`}>
            {value}
        </div>
    )
}

export default Square