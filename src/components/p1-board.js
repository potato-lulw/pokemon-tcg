import React, { useState } from 'react';
import { motion, } from 'framer-motion';
import Card from './card';
import { useBenchCards } from '../contexts/BenchCardContext';
import useRandomPokemonCard from '../hooks/useRandomPokemon';
import { useP1HandCardContext } from '../contexts/P1HandCardContext';


const P1Board = () => {


    const { fetchRandomPokemonCard } = useRandomPokemonCard();
    const { benchCards, setBenchCards } = useBenchCards();
    const [discardPile, setDiscardPile] = useState([]);
    const [clickedCardId, setClickedCardId] = useState(null);
    const { p1HandCards} = useP1HandCardContext();
    

    const cardExitAnimation = {
        x: 200, // Move the card  200 pixels to the right
        y: -100, // Optionally, move the card  100 pixels up
        opacity: 0, // Fade out the card
        rotate: 10, // Rotate the card by  10 degrees
        transition: { duration: 0.5, ease: "easeOut" },
    };

    console.log(benchCards)
    const handleBenchCardClick = (_id) => {
        setClickedCardId(_id);
        setTimeout(() => {
            const cardIndex = benchCards.indexOf(_id);

            // If the card is found, update the state
            if (cardIndex !== -1) {
                // Create a copy of benchCards
                const updatedBenchCards = [...benchCards];

                // Remove the clicked card from the copy
                updatedBenchCards.splice(cardIndex, 1);

                // Update benchCards and discardPile in the state
                setBenchCards(updatedBenchCards);
                setDiscardPile([...discardPile, _id]);
            }
        }, 300);
    };

    const handleCardsPileClick = () => {
        if (p1HandCards.length < 50) {
            fetchRandomPokemonCard('p1');
        }
    };

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
                <div className="mb-2 flex justify-center">
                    <Card />
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
                    <div className="bg-blue-500 w-12 h-16 flex items-center justify-center rounded-md cursor-pointer">
                        <span className="text-white text-sm">Discard</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default P1Board;
