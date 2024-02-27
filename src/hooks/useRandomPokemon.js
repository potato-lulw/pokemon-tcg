import { useEffect } from 'react';
import pokemon from 'pokemontcgsdk';
import { useBenchCards } from '../contexts/BenchCardContext';
import { useOppBenchCards } from '../contexts/OpponentCardContext';
import { useP1HandCardContext } from '../contexts/P1HandCardContext';

const useRandomPokemonCard = () => {
    const { setBenchCards} = useBenchCards();
    const { setOppBenchCards} = useOppBenchCards();
    const { p1HandCards, addCardToHand, removeCardFromHand, clearHand } = useP1HandCardContext();

    const fetchRandomPokemonCard = (player) => {
        pokemon.card
            .find(`base1-${Math.floor(Math.random() * 90)}`)  // Adjust the range based on your requirements
            .then(card => {
                if(player === 'p1'){

                    // setBenchCards(prevBenchCards => [...prevBenchCards, card.id]);
                    addCardToHand(card.id);
                }
                else{
                    setOppBenchCards(prevBenchCards => [...prevBenchCards, card.id]);
                }
            })
            .catch(error => {
                console.error('Error fetching card:', error);
            });
    };

    useEffect(() => {
        pokemon.configure({ apiKey: 'ab2116cc-22ec-43a9-be46-f0a22dec2a89' });
    }, []);

    return { fetchRandomPokemonCard };
};

export default useRandomPokemonCard;
