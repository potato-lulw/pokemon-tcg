import React, { useEffect, useState } from 'react';
import pokemon from 'pokemontcgsdk';

const Card = ({ _id }) => {
  const [cardUrl, setCardUrl] = useState('');
  const [cardName, setCardName] = useState('');
  const cardCache = {};
  useEffect(() => {
    pokemon.configure({ apiKey: 'ab2116cc-22ec-43a9-be46-f0a22dec2a89' });
    if (_id) {
      // Check if the card data is already in the cache
      if (cardCache[_id]) {
        // Use the cached data
        setCardUrl(cardCache[_id].url);
        setCardName(cardCache[_id].name);
      } else {
        // Fetch the card data and store it in the cache
        pokemon.card.find(_id)
          .then(card => {
            setCardUrl(card.images.small);
            setCardName(card.name);
            // Store the fetched data in the cache
            cardCache[_id] = { url: card.images.small, name: card.name };
          })
          .catch(error => {
            console.error('Error fetching card:', error);
          });
      }
    }
  }, [_id]);

  return (
    <div className="w-[4.5rem] h-24 flex items-center justify-center rounded-sm border-dashed bg-[url('/src/images/backside.png')] bg-contain bg-no-repeat shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)]">
      {cardUrl && <img src={cardUrl} alt={cardName} className='w-[4.5] h-24' />}
    </div>
  );
};

export default Card;
