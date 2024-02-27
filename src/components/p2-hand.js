import React from 'react'
import { useP2HandCardContext } from '../contexts/P2HandCardContext';

const P2Hand = () => {
    const { p2HandCards, addP2CardToHand, removeP2CardFromHand, clearP2Hand } =
    useP2HandCardContext();
    const cards = [1, 2, 3, 4, 5, 6, 7];
  return (
    <div className="p2-hand flex gap-2 m-2 p-2 text-primary ">
      {cards.map((card, index) => (
        <div key={index} className="card w-20 h-28 bg-secondary rounded-sm text-center">
          {/* Render card content here */}
          Card {card}
        </div>
      ))}
    </div>
  )
}

export default P2Hand