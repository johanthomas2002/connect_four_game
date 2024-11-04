import React from "react";
import Cell from "./Cell";

const Board = ({ board, onCellClick }) => {
  return (
    <div className="board">
      {board.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <Cell
            key={`${rowIndex}-${colIndex}`}
            color={cell}
            onClick={() => onCellClick(colIndex)}
          />
        ))
      )}
    </div>
  );
};

export default Board;
