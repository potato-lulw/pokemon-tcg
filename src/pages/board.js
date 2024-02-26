// src/Board.js
import React from 'react';

import P1Board from '../components/p1-board';
import P2Board from '../components/p2-board';

const Board = () => {
  return (
    <div className='min-h-[120vh]'>
    <P2Board/>
    <P1Board/>
    </div>
  );
};

export default Board;
