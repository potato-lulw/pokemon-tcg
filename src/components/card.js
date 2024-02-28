import React, { useEffect, useRef, useState } from 'react';
import pokemon from 'pokemontcgsdk';
import { useEffectRotationContext } from '../contexts/EffectsRoationsContext';

const Card = ({ _id }) => {
  const [cardUrl, setCardUrl] = useState('');
  const [cardName, setCardName] = useState('');
  const cardCache = useRef({});
  const { effects, rotations } = useEffectRotationContext();
  const [currEffects, setCurrEffect] = useState([]);
  const [currRoation, setCurrRotation] = useState(null);
  console.log(_id);
  useEffect(() => {
    pokemon.configure({ apiKey: 'ab2116cc-22ec-43a9-be46-f0a22dec2a89' });
    setCurrRotation( rotations[_id])
    setCurrEffect(effects[_id]);
    console.log(currEffects, currRoation)
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
  }, [_id, rotations, effects]);

  const applyRotation = currRoation === 'sleep' ? -90 :
                        currRoation === 'confused' ? -180 :
                        currRoation === 'paralized' ? -270 : 0;

  return (
    <div className="w-[4.5rem] h-24 flex items-center justify-center rounded-sm border-dashed bg-[url('/src/images/backside.png')] bg-contain bg-no-repeat shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] transition" style={{ transform: `rotate(${applyRotation}deg)`}}>
      {cardUrl && (
        <div className='relative '>

          <img src={cardUrl} alt={cardName} className='w-[4.5] h-24 ' />
          {currEffects && currEffects.has('burn') && (
            <img
              src='/images/burn.png'
              alt='Burn'
              className='absolute top-7 right-1 w-8 h-8'
            />)}
          {currEffects && currEffects.has('poison') && (
            <img
              src='/images/poison.png'
              alt='Poison'
              className='absolute top-[-10%] left-[-5%] w-8 h-8'
            />)}
        </div>
      )}
    </div>
  );
};

export default Card;
