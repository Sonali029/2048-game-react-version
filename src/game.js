import React, {useEffect, useState} from "react";
import Board from './board';

//MERGED INDEX NOT WORKING, ALSO WORK FOR SCORE AND BEST SCORE

function Game() {
    const [squares, setSquares] = useState(Array(16).fill(null))
    const [score, setScore] = useState(0)

    const getRandomIndex = () => {
        return Math.floor(Math.random() * squares.length);
    }

    const GameOver = () => {
        console.log("game is over")
    }
    
    
    const placeRandomTile = (board)  => {
        const newBoard = [...board];
        let randomIndex = getRandomIndex();

        while(newBoard[randomIndex] !== null) {
            randomIndex = getRandomIndex();
            <GameOver />
        }
        const value = Math.random() < 0.9 ? 2 : 4;
        // console.log("random index", randomIndex)
        newBoard[randomIndex] = value;
        return newBoard;
    }

    const initializeBoard = () => {
        let newSquares = Array(16).fill(null);
        newSquares = placeRandomTile(newSquares);
        newSquares = placeRandomTile(newSquares);
        setSquares(newSquares);
    }


    useEffect(() => {
    }, [squares]);  

    useEffect(() => {
        initializeBoard();
    }, []); 


    const moveTiles = (direction) => {
        let updated = false;
        let board = [...squares];
        let mergedPositions = [];
        switch (direction) {
            case 'up' :
                ({newBoard: board, updated, mergedPositions} = moveUp(board));
                break;
            case 'down' :
                ({newBoard: board, updated, mergedPositions} = moveDown(board));
                break;
            case 'left' :
                ({newBoard: board, updated, mergedPositions} = moveLeft(board));
                break;
            case 'right' :
                ({newBoard: board, updated, mergedPositions} = moveRight(board));
                break;
            default :
                break;
        }
        if (updated) {
            const newBoard = placeRandomTile(board, mergedPositions);
            setSquares(newBoard);
        }
    }

    const moveUp = (board) => {

        let newBoard = [...board];
        let updated = false;
        let mergedPositions = [];

        let grid = [];
        for (let i = 0; i < 4; i++) {
            grid[i] = [newBoard[i], newBoard[i + 4], newBoard[i + 8], newBoard[i + 12]];
        }
    
        for (let col = 0; col < 4; col++) {
            let filtered = grid[col].filter(val => val !== null); 
            let merged = [];
           
            let i = 0;
            console.log("every time value of i", i)
            while (i < filtered.length) {
                if (i < filtered.length - 1 && filtered[i] == filtered[i+1] && !mergedPositions.includes(i)) {
                    filtered[i] *= 2;
                    filtered[i+1] = null;
                    mergedPositions.push(i + col * 4);  
                    // console.log("merged up tiles", merged)
                    updated = true;
                    i += 2;
                    // setScore(filtered[i]);
                } else {
                    i += 1;
                }
            }

            filtered = filtered.filter(val => val != null);
      
            while (filtered.length < 4) {
                filtered.push(null);
            }

            for (let row = 0; row < 4; row++) {
                newBoard[row * 4 + col] = filtered[row];
                updated = true;
            }
        }
        return {newBoard, updated, mergedPositions}
    }

    const moveDown = (board) => {
        let newBoard = [...board];
        let updated = false;
        let mergedPositions = [];

        let grid = [];
        for (let i = 0; i < 4; i++) {
            grid[i] = [newBoard[i], newBoard[i+4], newBoard[i+8], newBoard[i+12]];
        }

        for (let col = 0; col < 4; col++) {
            let filtered = grid[col].filter(val => val != null);
            let merged = [];
            let i = 0;
            while (i < filtered.length) {
                if (i < filtered.length-1 && filtered[i] == filtered[i+1] && !mergedPositions.includes(i)) {
                    filtered[i] = filtered[i] * 2;
                    filtered[i+1] = null;
                    mergedPositions.push(i + col * 4);
                    updated = true;
                    i += 2;
                } else {
                    i += 1;
                }
            }
            filtered = filtered.filter(val => val != null);

            while (filtered.length < 4) {
                filtered.push(null);
            }
            filtered.reverse();
            for (let row = 0; row < 4; row++) {
                newBoard[row * 4 + col] = filtered[row];
                updated = true;
            }
        }
        return {newBoard, updated, mergedPositions};
    }

    const moveLeft = (board) => {
        let newBoard = [...board];
        let updated = false;
        let mergedPositions = [];

        let grid = [];
        for (let i = 0; i <16; i+=4) {
            grid.push([newBoard[i], newBoard[i+1], newBoard[i+2], newBoard[i+3]]);
        }
        for (let row = 0; row < 4; row++) {
            let filtered = grid[row].filter(val => val != null);
            let merged = [];
            let i = 0;
            while (i < filtered.length) {
                if (i < filtered.length-1 && filtered[i] == filtered[i+1] && !mergedPositions.includes(i)) {
                    filtered[i] = filtered[i] * 2;
                    filtered[i+1] = null;
                    mergedPositions.push(i + row * 4);
                    i += 2;
                    updated = true;
                } else {
                    i += 1;
                }
            }
            filtered = filtered.filter(val => val != null);
            while (filtered.length < 4) {
                filtered.push(null);
            }

            for (let col = 0; col < 4; col++) {
                newBoard[row * 4 + col] = filtered[col];
                updated = true;
            }
        }
        return {newBoard, updated, mergedPositions};
    }

    const moveRight = (board) => {
        let newBoard = [...board];
        let updated = false;
        let mergedPositions = [];

        let grid = [];
        for (let i = 0; i < 16; i+=4) {
            grid.push([newBoard[i], newBoard[i+1], newBoard[i+2], newBoard[i+3]])
        }

        for (let row = 0; row < 4; row++) {
            let filtered = grid[row].filter(val => val != null);
            // let merged = [];
            // let originalIndices =(grid[row].map((val, index) => (val !== null ? index : null)).filter(index => index !== null));
            // console.log("original indices", originalIndices, row);
            let i = 0;
            // let mergedIndex = originalIndices[i] + row * 4;
            while (i < filtered.length) {
                if (i < filtered.length-1 && filtered[i] == filtered[i+1] && !mergedPositions.includes(i)) {
                    console.log("i", i)
                    filtered [i] = filtered[i] * 2;
                    filtered[i+1] = null;
                    // mergedPositions.push(originalIndices[i] + row * 4);
                    updated = true;
                    i += 2;
                } else {
                    i += 1;
                }
            }
            filtered = filtered.filter(val => val != null);
            while (filtered.length < 4) {
                filtered.push(null);
            }
            filtered.reverse();
            for (let col = 0; col < 4; col++) {
                newBoard[row * 4 + col] = filtered[col];
                updated = true;
            }
            // console.log("Final merged tile positions:", finalMergedPositions);
        }
        return {newBoard, updated, mergedPositions};
    }
    
    const handleKeyDown = (event) => {
            event.preventDefault();
            switch (event.key) {
             case "ArrowUp" :
                moveTiles('up');
                break;
             case "ArrowDown" :
                moveTiles('down');
                break;
             case "ArrowLeft" :
                moveTiles('left');
                break;
             case "ArrowRight" :
                moveTiles('right');
                break;
             default :
                 break;
            }
        }

        useEffect(() => {
            document.addEventListener("keydown", handleKeyDown);
            return () => {
                document.removeEventListener("keydown", handleKeyDown);
            };
        }, [squares])

    const restartGame = () => {
        initializeBoard();
        // setSquares(Array(16).fill(null));
        setScore(0);
        
    }

 
 

    const NewGame = () => {
        return (
            <div className = 'restart-game' onClick = {restartGame}>
                New Game 
            </div>
        )
    }

    const Heading = () => {
        return (
            <div className = 'heading'>
                <GameImage />
                <div className = 'score-container'>
                    <CurrentScore />
                    <BestScore />
                </div>
            </div>
        )
    }

    const CurrentScore = () => {
        return (
            <div className = 'score-box'>
                SCORE
                <span className="bold-score"> {score} </span>
            </div>
        )
    }

    const BestScore = () => {
        return (
            <div className = 'score-box'>
                BEST
                <span className="bold-score"> 0</span>
            </div>
        )
    }

    return (
      <div>
        <div className = 'container'>
            <Heading />
            <div className = 'game-intro'>
                <GameIntro />
                <NewGame />
            </div>
            <div className = 'game-container'>
                <Board value = {squares} onKeyDown = {handleKeyDown}/>
            </div>
        </div>
      </div>
    )
    
   
}



const GameImage = () => {
    return (
    <div className = 'title'>
        <img src = 'https://www.2048.org/logo.png' />
    </div>
    )
}





const GameIntro = () => {
    return (
        <div className = 'game-rule'>
            Join numbers to get to the
            <strong> 2048 tile!</strong>
        </div>
    )
}

export default Game