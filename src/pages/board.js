// src/Board.js
import React from 'react';

import P1Board from '../components/p1-board';
import P2Board from '../components/p2-board';
import P2Hand from '../components/p2-hand';
import P1Hand from '../components/p1-hand';

const Board = () => {
  return (
    <div className='min-h-screen flex flex-col align-middle items-center justify-center'>
      {/* <P2Hand /> */}
      <P2Board />
      <P1Board />
      <P1Hand />
    </div>
  );
};

export default Board;
