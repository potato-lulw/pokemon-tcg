import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Card from './card';
import { useBenchCards } from '../contexts/BenchCardContext';
import useRandomPokemonCard from '../hooks/useRandomPokemon';
import { useP1HandCardContext } from '../contexts/P1HandCardContext';
import { useP1ActiveCardContext } from '../contexts/P1ActiveCardContext';
import { useEffectRotationContext } from '../contexts/EffectsRoationsContext';


const P1Board = () => {


    const { fetchRandomPokemonCard } = useRandomPokemonCard();
    const { benchCards, setBenchCards } = useBenchCards();
    const [discardPile, setDiscardPile] = useState([]);
    const [clickedCardId, setClickedCardId] = useState(null);
    const { p1HandCards } = useP1HandCardContext();
    const { p1ActiveCard, setPlayCard, removeActiveCard } = useP1ActiveCardContext();
    const { effects, rotations, setEffects, setRotations } = useEffectRotationContext();


    const cardExitAnimation = {
        x: 200,
        y: -100,
        opacity: 0,
        rotate: 10,
        transition: { duration: 0.5, ease: "easeOut" },
    };

    const activeCardExitAnimation = {
        x: 200,
        y: 0,
        opacity: 0,
        rotate: 10,
        transition: { duration: 0.5, ease: "easeOut" },
    };

    const handleBenchCardClick = (_id) => {
        // Check if the active card slot is empty
        if (!p1ActiveCard) {
            setClickedCardId(_id);
            setTimeout(() => {
                const cardIndex = benchCards.indexOf(_id);

                if (cardIndex !== -1) {
                    const updatedBenchCards = [...benchCards];
                    updatedBenchCards.splice(cardIndex, 1);
                    setBenchCards(updatedBenchCards);
                    setDiscardPile([...discardPile, _id]);
                    // Move the clicked card to the active card slot
                    setPlayCard(_id);
                }
            }, 300);
        }
    };

    console.log(p1ActiveCard)

    const handleCardsPileClick = () => {
        if (p1HandCards.length < 50) {
            fetchRandomPokemonCard('p1');
        }
    };

    const handleEffectsClick = (_id, isEffect, effectType) => {
        if (isEffect) {
            // Add effect to the context if it's not already there
            const updatedEffects = { ...effects };
            if (!updatedEffects[_id]) {
              updatedEffects[_id] = new Set();
            }
      
            updatedEffects[_id].add(effectType);
      
            setEffects(updatedEffects);
          } else {
            // Update rotation in the context
            const validRotations = new Set(['paralized', 'sleep', 'confused']);
            if (validRotations.has(effectType)) {
              const updatedRotations = { ...rotations };
              updatedRotations[_id] = effectType;
      
              setRotations(updatedRotations);
            }
          }
        
    };


    //   console.log(`effect = ${effects}, roation: ${rotations}`);
    console.log(effects);
    console.log(rotations);

    return (
        <div className="flex flex-row items-center justify-center gap-2 ">
            <div className=" flex flex-col space-y-4 bg-primary p-2 rounded-md">
                <div className="grid grid-cols-2 gap-4">
                    {[1, 2, 3, 4, 5, 6].map((index) => (
                        <div
                            key={index}
                            className="bg-blue-500 w-8 h-12 flex items-center justify-center rounded-md"
                        >
                            <span className="text-white text-sm">{index}</span>
                        </div>
                    ))}
                </div>
            </div>
            <div className="bg-primary  p-4 rounded-lg shadow-md min-w-[400px] min-h-[200px]">


                {/* Active Card */}
                <div className='flex items-center justify-center'>
                    <motion.div
                        className="mb-2 flex items-center  justify-center relative border-2 border-white/50  border-dashed rounded-sm min-w-20 max-w-24 min-h-[6.5rem] "

                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 1.4 }}


                    >
                        <AnimatePresence>
                            {p1ActiveCard && (
                                <motion.div
                                    className=''
                                    initial={{ x: `100%`, y: "50%" }}
                                    transition={{ type: "spring", duration: 0.5 }}
                                    animate={{ x: 0, y: 0 }}
                                    exit={activeCardExitAnimation}
                                >
                                    <Card _id={p1ActiveCard} />
                                </motion.div>
                            )}
                        </AnimatePresence>


                    </motion.div>
                    {p1ActiveCard && (
                        <div className='flex flex-col text-sm ml-10'>
                            <button onClick={() => handleEffectsClick(p1ActiveCard, true, 'burn')}>bur</button>
                            <button onClick={() => handleEffectsClick(p1ActiveCard, true, 'poison')}>poi</button>
                            <button onClick={() => handleEffectsClick(p1ActiveCard, false, 'confused')}>con</button>
                            <button onClick={() => handleEffectsClick(p1ActiveCard, false, 'paralized')}>par</button>
                            <button onClick={() => handleEffectsClick(p1ActiveCard, false, 'sleep')}>asl</button>
                        </div>
                    )}

                </div>


                {/* Bench Cards */}
                <div className="">

                    <div className="flex space-x-4">
                        {[0, 1, 2, 3, 4].map((index) => (
                            <motion.div
                                key={index}
                                className="relative border-2 border-white/50  border-dashed rounded-sm min-w-20 min-h-[6.5rem] p-1"
                                onClick={() => handleBenchCardClick(benchCards[index])}

                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 1.4 }}
                            >
                                {benchCards.length > index && (
                                    <motion.div
                                        initial={{ x: `${(5 - index) * 100}%`, y: "50%" }}
                                        transition={{ type: "spring", duration: 0.5 }}
                                        animate={index === benchCards.indexOf(clickedCardId) ? cardExitAnimation : { x: 0, y: 0 }}
                                        onAnimationComplete={() => setClickedCardId(null)}
                                    >
                                        {benchCards.length > index && <Card _id={benchCards[index]} />}
                                    </motion.div>
                                )}
                            </motion.div>
                        ))}
                    </div>

                </div>

            </div>
            <div className=' flex flex-col space-y-4 bg-primary p-2 rounded-md'>
                {/* Pile */}
                <div
                    className="bg-blue-500 w-12 h-16 flex items-center justify-center rounded-md cursor-pointer"
                    onClick={handleCardsPileClick}
                >
                    <span className="text-white text-sm">Cards</span>
                </div>
                {/* discard pile */}
                <div>
                    <div className="bg-blue-500 w-12 h-16 flex items-center justify-center rounded-md cursor-pointer" onClick={removeActiveCard}>
                        <span className="text-white text-sm">Discard</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default P1Board;
