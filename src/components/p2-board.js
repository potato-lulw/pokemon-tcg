import React, { useState } from 'react';
import Card from './card';
import { useOppBenchCards } from '../contexts/OpponentCardContext';
import { motion } from 'framer-motion';
import useRandomPokemonCard from '../hooks/useRandomPokemon';

const P2Board = () => {
    const { fetchRandomPokemonCard } = useRandomPokemonCard();
    const { oppBenchCards, setOppBenchCards } = useOppBenchCards();
    const [discardPile, setDiscardPile] = useState([]);
    // const [isAnimating, setIsAnimating] = useState(false);
    const [clickedCardId, setClickedCardId] = useState(null);

    const cardExitAnimation = {
        x: 200, // Move the card  200 pixels to the right
        y: -100, // Optionally, move the card  100 pixels up
        opacity: 0, // Fade out the card
        rotate: 10, // Rotate the card by  10 degrees
        transition: { duration: 0.5, ease: "easeOut" },
    };

    
    const handleBenchCardClick = (_id, ind) => {

        // setIsAnimating(true);
        setClickedCardId(_id);
        setTimeout(() => {
            const cardIndex = oppBenchCards.indexOf(_id);

            // If the card is found, update the state
            if (cardIndex !== -1) {
                // Create a copy of benchCards
                const updatedBenchCards = [...oppBenchCards];

                // Remove the clicked card from the copy
                updatedBenchCards.splice(cardIndex, 1);

                // Update benchCards and discardPile in the state
                setOppBenchCards(updatedBenchCards);
                setDiscardPile([...discardPile, _id]);
            }
        }, 300)


    };

    const handleOppCardsPileClick = () => {
        if (oppBenchCards.length < 5) {
            fetchRandomPokemonCard('p2');
        }
    };
    return (
        <div className="my-1 flex flex-row items-center justify-center gap-2">

            <div className=" flex flex-col space-y-4 bg-primary p-2 rounded-md">
                {/* <h2 className="text-xl font-semibold mb-2">Opponent's Prize Cards</h2> */}
                <div className="grid grid-cols-2 gap-4">
                    {[1, 2, 3, 4, 5, 6].map((index) => (
                        <div
                            key={index}
                            className="bg-red-500 w-8 h-12 flex items-center justify-center rounded-md"
                        >
                            <span className="text-white text-sm">{index}</span>
                        </div>
                    ))}
                </div>
            </div>


            <div className="bg-primary p-4 rounded-lg shadow-md  min-w-[400px] min-h-[200px]">


                {/* Opponent's Bench Cards */}
                <div className="mb-2">
                    {/* <h2 className="text-xl font-semibold mb-2 text-center">Opponent's Bench</h2> */}
                    <div className="test flex space-x-4">
                        {[0, 1, 2, 3, 4].map((index) => (
                            <motion.div
                                key={index}
                                className="oppBench relative border-2 border-white/50 px-1 border-dashed rounded-sm min-w-20 min-h-[6.5rem] p-1"
                                onClick={() => handleBenchCardClick(oppBenchCards[index], index)}
                                whileHover={{ scale: 1.2 }}
                                whileTap={{scale:1.4}}
                                
                            >
                                {oppBenchCards.length > index && (
                                    <motion.div
                                        initial={{ x: `${(5 - index) * 100}%`, y: "50%" }}
                                        
                                        transition={{ type: "spring", duration: 0.5 }}
                                        animate={index === oppBenchCards.indexOf(clickedCardId)? cardExitAnimation : { x: "0", y: '0' }}
                                onAnimationComplete={() => setClickedCardId(null)}
                                    >
                                        {oppBenchCards.length > index && <Card _id={oppBenchCards[index]} />}
                                    </motion.div>
                                )}
                            </motion.div>
                        ))}
                    </div>

                </div>

                {/* Opponent's Active Card */}
                <div className="mb-4 flex justify-center">
                    {/* Uncomment the line below if you want to display a title for the active card */}
                    {/* <h2 className="text-xl font-semibold mb-2">Opponent's Active Card</h2> */}
                    <Card />
                </div>

            </div>
            <div className='flex flex-col space-y-4 bg-primary p-2 rounded-md'>
                {/* discard pile */}
                <div>
                    <div className="bg-red-500 w-12 h-16 flex items-center justify-center rounded-md cursor-pointer">
                        <span className="text-white text-sm">Discard</span>
                    </div>
                </div>
                {/* Pile */}
                <div>
                    <div className="bg-red-500 w-12 h-16 flex items-center justify-center rounded-md cursor-pointer" onClick={handleOppCardsPileClick}>
                        <span className="text-white text-sm">Cards</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default P2Board;
