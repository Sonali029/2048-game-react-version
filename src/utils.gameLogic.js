export const BOARD_SIZE = 4;
export const BOARD_SQUARE = BOARD_SIZE * BOARD_SIZE;

export const processLine = (line) => {
    let points = 0;
    let filtered = line.filter(val => val !== null);
  
    let result = [];
    let skip = false;
  
    for (let i = 0; i < filtered.length; i++) {
      if (skip) {
        skip = false;
        continue;
      }
  
      if (i < filtered.length - 1 && filtered[i] === filtered[i + 1]) {
        const mergedValue = filtered[i] * 2;
        points += mergedValue;
        result.push(mergedValue);
        skip = true; // skip the next element
      } else {
        result.push(filtered[i]);
      }
    }

    while (result.length < BOARD_SIZE) {
      result.push(null);
    }
  
    return { result, points };
  };
  
export const getLines = (board, direction) => {
    const lines = [];
    if (direction === 'left' || direction === 'right') {
        // Extract Rows
        for (let r = 0; r < BOARD_SIZE; r++) {
            lines.push(board.slice(r * BOARD_SIZE, (r + 1) * BOARD_SIZE));
        }
    } else {
        // Extract Columns
        for (let c = 0; c < BOARD_SIZE; c++) {
            const col = [];
            for (let r = 0; r < BOARD_SIZE; r++) {
                col.push(board[r * BOARD_SIZE + c]);
            }
            lines.push(col);
        }
    }
    return lines;
};

export const setLines = (lines, direction) => {
    let newBoard = Array(BOARD_SQUARE).fill(null);
    if (direction === 'left' || direction === 'right') {
        // Place Rows
        lines.forEach((line, r) => {
            line.forEach((val, c) => {
                newBoard[r * BOARD_SIZE + c] = val;
            });
        });
    } else {
        // Place Columns
        lines.forEach((line, c) => {
            line.forEach((val, r) => {
                newBoard[r * BOARD_SIZE + c] = val;
            });
        });
    }
    return newBoard;
};

export const placeRandomTile = (board) => {
    const newBoard = [...board];
    const emptyIndices = newBoard.map((val, index) => (val === null ? index : null)).filter(index => index !== null);
    
    if (emptyIndices.length === 0) return newBoard; 
    
    const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
    newBoard[randomIndex] = Math.random() < 0.9 ? 2 : 4;
    return newBoard;
};