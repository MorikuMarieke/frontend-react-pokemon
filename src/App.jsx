import './App.css'
import Button from './components/button/Button.jsx';
import PokemonCard from './components/pokemonCard/PokemonCard.jsx';
import {useEffect, useState} from 'react';
import {API_BASE} from './constants/constants.js';
import axios from 'axios';
import pokemonLogo from './assets/pokemon-logo.png';
import { SpinnerGap, Smiley } from "@phosphor-icons/react";

function App() {
    const [pokemonList, setPokemonList] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [offset, setOffset] = useState(0);
    const [count, setCount] = useState(0);

    useEffect(() => {
        const controller = new AbortController();
        async function fetchPokemon() {
            setLoading(true)
            try {
                setError(null);
                const response = await axios.get(`${API_BASE}pokemon/?limit=20&offset=${offset}`, {
                    signal: controller.signal,
                });
                console.log(response.data);
                const pokemonData = response.data.results;
                const fullPokemonData = [];
                const totalPokemonCount = response.data.count;
                setCount(totalPokemonCount);

                for (const pokemon of pokemonData) {
                    const pokemonDetailResponse = await axios.get(pokemon.url);
                    fullPokemonData.push(pokemonDetailResponse.data);
                }
                setPokemonList(fullPokemonData);
                console.log(fullPokemonData);
            } catch (err) {
                setError(`Unable to fetch Pokemon: ${err.message}`);
                console.error(err);
            } finally {
                setLoading(false);
            }
        }

        fetchPokemon();
        // return () => controller.abort(); // Vraag aan degene die mijn code nakijkt: Is dit ook een mogelijkheid?
        return function cleanup() {
            controller.abort();
        }
    }, [offset]);

    const handlePreviousClick = () => {
        if (offset > 0) {
            setOffset(offset - 20);
        }
    };

    const handleNextClick = () => {
        setOffset(offset + 20);
    };

    return (
        <>
            <header className="outer-container">
                <div className="inner-container">
                    <div className="image-wrapper-pokemon-logo">
                        <img className="pokemon-logo" src={pokemonLogo} alt='pokemon-logo'/>
                    </div>
                    <h1>Gotta catch 'em all!</h1>
                    <div className="button-container">
                        <Button
                            type="button"
                            buttonText="Vorige"
                            className="navigate-button"
                            onClick={handlePreviousClick}
                            isDisabled={offset === 0}
                        />
                        <Button
                            type="button"
                            buttonText="Volgende"
                            className="navigate-button"
                            onClick={handleNextClick}
                            isDisabled={offset + 20 >= count}
                        />
                    </div>
                    {loading ? <div className="loading-message">
                        <SpinnerGap size={32}/> <p>Loading...</p>
                    </div> : <div className="loading-message"></div>}
                </div>
            </header>
            <main className="outer-container">
                <div className="inner-container">
                {error ? <div className="error-message">{error}</div> :
                            <>
                                {pokemonList.map((pokemon) => (
                                    <PokemonCard key={`${pokemon.id} ${pokemon.name}`} pokemon={pokemon}/>
                                ))}
                            </>
                    }
                </div>
            </main>
            <footer className="outer-container">
                <div className="inner-container">
                    <Smiley size={32} />
                    <p>Ba-na-na-na tu tu tu-du-du, sorry not sorry</p>
                </div>
            </footer>

        </>
    )
}

export default App
