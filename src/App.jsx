import React, { useState } from "react";
import Board from "./components/Board";


const App = () => {
  const rows = 6;
  const cols = 7;

  // Set up the board, player turns, and winner state
  const [board, setBoard] = useState(Array(rows).fill(Array(cols).fill(null)));
  const [currentPlayer, setCurrentPlayer] = useState("Red");
  const [winner, setWinner] = useState(null);

  const handleCellClick = (col) => {
    if (winner) return;

    // getting lowest empty row in the selected column
    const newBoard = board.map(row => row.slice());
    for (let row = rows - 1; row >= 0; row--) {
      if (!newBoard[row][col]) {
        newBoard[row][col] = currentPlayer;
        setBoard(newBoard);
        checkForWinner(newBoard, row, col);
        setCurrentPlayer(currentPlayer === "Red" ? "Yellow" : "Red");
        break;
      }
    }
  };

  const checkForWinner = (board, row, col) => {
    // Helper function to check winning conditions
    if (checkDirection(board, row, col, 1, 0) >= 4 || // Horizontal
        checkDirection(board, row, col, 0, 1) >= 4 || // Vertical
        checkDirection(board, row, col, 1, 1) >= 4 || // Diagonal \
        checkDirection(board, row, col, 1, -1) >= 4) { // Diagonal /
      setWinner(currentPlayer);
    }
  };

  const checkDirection = (board, row, col, rowDir, colDir) => {
    const color = board[row][col];
    let count = 0;
    for (let i = -3; i <= 3; i++) {
      const newRow = row + i * rowDir;
      const newCol = col + i * colDir;
      if (
        newRow >= 0 && newRow < rows &&
        newCol >= 0 && newCol < cols &&
        board[newRow][newCol] === color
      ) {
        count++;
        if (count === 4) return count;
      } else {
        count = 0;
      }
    }
    return count;
  };

  return (
    <div>
      <h1>Connect Four</h1>
      {winner ? <h2>{winner} Wins!</h2> : <h2>Current Player: {currentPlayer}</h2>}
      <Board board={board} onCellClick={handleCellClick} />
      <button id="btn" onClick={() => { setBoard(Array(rows).fill(Array(cols).fill(null))); setWinner(null); }}>Restart Game</button>
    </div>
  );
};

export default App;
