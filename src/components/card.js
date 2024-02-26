// Card.js

import React, { useEffect, useState } from 'react';
import pokemon from 'pokemontcgsdk';

const Card = ({ _id }) => {
  const [cardUrl, setCardUrl] = useState('');
  const [cardName, setCardName] = useState('');

  useEffect(() => {
    pokemon.configure({ apiKey: 'ab2116cc-22ec-43a9-be46-f0a22dec2a89' });
    if (_id) {
      pokemon.card.find(_id)
        .then(card => {
          setCardUrl(card.images.small);
          setCardName(card.name);
        })
        .catch(error => {
          console.error('Error fetching card:', error);
        });
    }
  }, [_id])
  return (
    <div className="w-20 h-32 flex items-center justify-center rounded-sm   border-dashed bg-[url('/src/images/backside.png')] bg-contain bg-no-repeat ">
      {cardUrl && <img src={cardUrl} alt={cardName} className='w-20 h-32'/>}
      

    </div>
  );
};

export default Card;
