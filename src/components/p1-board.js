import React, { useState } from 'react';
import { motion,  } from 'framer-motion';
import Card from './card';
import { useBenchCards } from '../contexts/BenchCardContext';
import useRandomPokemonCard from '../hooks/useRandomPokemon';


const P1Board = () => {


    const { fetchRandomPokemonCard } = useRandomPokemonCard();
    const { benchCards, setBenchCards } = useBenchCards();
    const [discardPile, setDiscardPile] = useState([]);
    const [clickedCardId, setClickedCardId] = useState(null);

    const cardExitAnimation = {
        x:  200, // Move the card  200 pixels to the right
        y: -100, // Optionally, move the card  100 pixels up
        opacity:  0, // Fade out the card
        rotate:  10, // Rotate the card by  10 degrees
        transition: { duration:  0.5, ease: "easeOut" },
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
        },300);
    };

    const handleCardsPileClick = () => {
        if (benchCards.length < 5) {
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
                            className="bg-blue-500 w-12 h-20 flex items-center justify-center rounded-md"
                        >
                            <span className="text-white text-sm">Prize {index}</span>
                        </div>
                    ))}
                </div>
            </div>
            <div className="bg-primary  p-4 rounded-lg shadow-md min-w-[400px] min-h-[300px]">


                {/* Active Card */}
                <div className="mb-4 flex justify-center">
                    <Card />
                </div>

                {/* Bench Cards */}
                <div className="mb-4">

                    <div className="flex space-x-4 ">


                        <motion.div 
                            className="relative border-2 border-white/50 px-1 border-dashed rounded-sm min-w-20 min-h-32 p-1" 
                            onClick={() => handleBenchCardClick(benchCards[0])} 
                            whileHover={{ scale: 1.5 }} 
                            animate={benchCards[0] === clickedCardId ? cardExitAnimation : {}}
                            onAnimationComplete={() => setClickedCardId(null)}>
                            {benchCards.length > 0 && (
                                <motion.div initial={{x:"500%", y: "-50%"}} animate={{ x: "0", y:'0'}} transition={{ type: "spring", duration:0.5}}>
                                    {benchCards.length > 0 && <Card _id={benchCards[0]} />}
                                </motion.div>
                            )}

                        </motion.div>
                        <motion.div 
                            className="relative border-2 border-white/50 px-1 border-dashed rounded-sm min-w-20 min-h-32 p-1" 
                            onClick={() => handleBenchCardClick(benchCards[1])} 
                            whileHover={{ scale: 1.5 }} 
                            animate={benchCards[1] === clickedCardId ? cardExitAnimation : {}}
                            onAnimationComplete={() => setClickedCardId(null)}>
                            {benchCards.length > 1 && (
                                <motion.div initial={{x:"400%", y: "-50%"}} animate={{ x: "0", y:'0'}} transition={{ type: "spring", duration:0.5}}>
                                    {benchCards.length > 1 && <Card _id={benchCards[1]} />}
                                </motion.div>
                            )}
                        </motion.div>
                        <motion.div 
                            className="relative border-2 border-white/50 px-1 border-dashed rounded-sm min-w-20 min-h-32 p-1" 
                            onClick={() => handleBenchCardClick(benchCards[2])} 
                            whileHover={{ scale: 1.5 }} 
                            animate={benchCards[2] === clickedCardId ? cardExitAnimation : {}}
                            onAnimationComplete={() => setClickedCardId(null)}>
                            {benchCards.length > 2 && (
                                <motion.div initial={{x:"300%", y: "-50%"}} animate={{ x: "0", y:'0'}} transition={{ type: "spring", duration:0.5}}>
                                    {benchCards.length > 2 && <Card _id={benchCards[2]} />}
                                </motion.div>
                            )}
                        </motion.div>
                        <motion.div 
                            className="relative border-2 border-white/50 px-1 border-dashed rounded-sm min-w-20 min-h-32 p-1" 
                            onClick={() => handleBenchCardClick(benchCards[3])} 
                            whileHover={{ scale: 1.5 }} 
                            animate={benchCards[3] === clickedCardId ? cardExitAnimation : {}}
                            onAnimationComplete={() => setClickedCardId(null)}>
                            {benchCards.length > 3 && (
                                <motion.div initial={{x:"200%", y: "-50%"}} animate={{ x: "0", y:'0'}} transition={{ type: "spring", duration:0.5}}>
                                    {benchCards.length > 3 && <Card _id={benchCards[3]} />}
                                </motion.div>
                            )}
                        </motion.div>
                        <motion.div 
                            className="relative border-2 border-white/50 px-1 border-dashed rounded-sm min-w-20 min-h-32 p-1" 
                            onClick={() => handleBenchCardClick(benchCards[4])} 
                            whileHover={{ scale: 1.5 }} 
                            animate={benchCards[4] === clickedCardId ? cardExitAnimation : {}}
                            onAnimationComplete={() => setClickedCardId(null)}>
                            {benchCards.length > 4 && (
                                <motion.div initial={{x:"100%", y: "-50%"}} animate={{ x: "0", y:'0'}} transition={{ type: "spring", duration:0.5}}>
                                    {benchCards.length > 4 && <Card _id={benchCards[4]} />}
                                </motion.div>
                            )}
                        </motion.div>

                    </div>
                </div>

            </div>
            <div className=' flex flex-col space-y-4 bg-primary p-2 rounded-md'>
                {/* Pile */}
                <div
                    className="bg-blue-500 w-16 h-24 flex items-center justify-center rounded-md cursor-pointer"
                    onClick={handleCardsPileClick}
                >
                    <span className="text-white text-sm">Cards</span>
                </div>
                {/* discard pile */}
                <div>
                    <div className="bg-blue-500 w-16 h-24 flex items-center justify-center rounded-md cursor-pointer">
                        <span className="text-white text-sm">Discard</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default P1Board;
