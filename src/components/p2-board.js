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
        x:  200, // Move the card  200 pixels to the right
        y: -100, // Optionally, move the card  100 pixels up
        opacity:  0, // Fade out the card
        rotate:  10, // Rotate the card by  10 degrees
        transition: { duration:  0.5, ease: "easeOut" },
      };

    console.log(oppBenchCards);
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
                            className="bg-red-500 w-12 h-20 flex items-center justify-center rounded-md"
                        >
                            <span className="text-white text-sm">Prize {index}</span>
                        </div>
                    ))}
                </div>
            </div>


            <div className="bg-primary p-4 rounded-lg shadow-md  min-w-[400px] min-h-[300px]">


                {/* Opponent's Bench Cards */}
                <div className="mb-4">
                    {/* <h2 className="text-xl font-semibold mb-2 text-center">Opponent's Bench</h2> */}
                    <div className="test flex space-x-4 " >


                        <motion.div
                            className="oppBench relative border-2 border-white/50 px-1 border-dashed rounded-sm min-w-20 min-h-32 p-1"
                            onClick={() => handleBenchCardClick(oppBenchCards[0], 0)}
                            whileHover={{ scale: 1.5 }}
                            animate={oppBenchCards[0] === clickedCardId ? cardExitAnimation : {}}
                            onAnimationComplete={() => setClickedCardId(null)}
                        >
                            {oppBenchCards.length > 0 && (
                                <motion.div
                                    initial={{ x: "500%", y: "50%" }}
                                    animate={{ x: "0", y: '0' }}
                                    transition={{ type: "spring", duration: 0.5 }}>
                                    {oppBenchCards.length > 0 && <Card _id={oppBenchCards[0]} />}
                                </motion.div>
                            )}

                        </motion.div>
                        <motion.div 
                            className="oppBench relative border-2 border-white/50 px-1 border-dashed rounded-sm min-w-20 min-h-32 p-1" 
                            onClick={() => handleBenchCardClick(oppBenchCards[1], 1)} 
                            whileHover={{ scale: 1.5 }} 
                            animate={oppBenchCards[1] === clickedCardId ? cardExitAnimation : {}}
                            onAnimationComplete={() => setClickedCardId(null)}>
                            {oppBenchCards.length > 1 && (
                                <motion.div initial={{ x: "400%", y: "50%" }} animate={{ x: "0", y: '0' }} transition={{ type: "spring", duration: 0.5 }}>
                                    {oppBenchCards.length > 1 && <Card _id={oppBenchCards[1]} />}
                                </motion.div>
                            )}
                        </motion.div>
                        <motion.div 
                            className="oppBench relative border-2 border-white/50 px-1 border-dashed rounded-sm min-w-20 min-h-32 p-1" 
                            onClick={() => handleBenchCardClick(oppBenchCards[2], 2)} 
                            whileHover={{ scale: 1.5 }} 
                            animate={oppBenchCards[2] === clickedCardId ? cardExitAnimation : {}}
                            onAnimationComplete={() => setClickedCardId(null)}>
                            {oppBenchCards.length > 2 && (
                                <motion.div initial={{ x: "300%", y: "50%" }} animate={{ x: "0", y: '0' }} transition={{ type: "spring", duration: 0.5 }}>
                                    {oppBenchCards.length > 2 && <Card _id={oppBenchCards[2]} />}
                                </motion.div>
                            )}
                        </motion.div>
                        <motion.div 
                            className="oppBench relative border-2 border-white/50 px-1 border-dashed rounded-sm min-w-20 min-h-32 p-1" 
                            onClick={() => handleBenchCardClick(oppBenchCards[3], 3)} 
                            whileHover={{ scale: 1.5 }} 
                            animate={oppBenchCards[3] === clickedCardId ? cardExitAnimation : {}}
                            onAnimationComplete={() => setClickedCardId(null)}> 
                            {oppBenchCards.length > 3 && (
                                <motion.div initial={{ x: "200%", y: "50%" }} animate={{ x: "0", y: '0' }} transition={{ type: "spring", duration: 0.5 }}>
                                    {oppBenchCards.length > 3 && <Card _id={oppBenchCards[3]} />}
                                </motion.div>
                            )}
                        </motion.div>
                        <motion.div 
                            className="oppBench relative border-2 border-white/50 px-1 border-dashed rounded-sm min-w-20 min-h-32 p-1" 
                            onClick={() => handleBenchCardClick(oppBenchCards[4], 4)} 
                            whileHover={{ scale: 1.5 }} 
                            animate={oppBenchCards[4] === clickedCardId ? cardExitAnimation : {}}
                            onAnimationComplete={() => setClickedCardId(null)}>
                            {oppBenchCards.length > 4 && (
                                <motion.div initial={{ x: "100%", y: "50%" }} animate={{ x: "0", y: '0' }} transition={{ type: "spring", duration: 0.5 }}>
                                    {oppBenchCards.length > 4 && <Card _id={oppBenchCards[4]} />}
                                </motion.div>
                            )}
                        </motion.div>
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
                    <div className="bg-red-500 w-16 h-24 flex items-center justify-center rounded-md cursor-pointer">
                        <span className="text-white text-sm">Discard</span>
                    </div>
                </div>
                {/* Pile */}
                <div>
                    <div className="bg-red-500 w-16 h-24 flex items-center justify-center rounded-md cursor-pointer"  onClick={handleOppCardsPileClick}>
                        <span className="text-white text-sm">Cards</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default P2Board;
