import React from 'react';
import './PokemonCard.css'

function PokemonCard({pokemon}) {

    console.log(pokemon);

    return (
        <article className="pokemon-card">
            <h2>{pokemon?.name || 'No name available'}</h2>
            {pokemon?.sprites?.front_default ?
                (
                    <div className="pokemon-img-wrapper">
                        <img
                            src={pokemon.sprites.front_default}
                            alt={`
                        Image of ${pokemon?.name}`}
                        />
                    </div>
                ) : <p>Image not available</p>
            }
            <p><strong>Moves: </strong>{pokemon?.moves?.length}</p>
            <p><strong>Weight: </strong>{pokemon?.weight}</p>
            <p><strong>Abilities:</strong></p>
            <ul>
                {pokemon?.abilities?.map((item) => (
                    <li key={`${item.ability.name}-${pokemon.name}`}>{item.ability.name}</li>
                ))}
            </ul>
        </article>
    );
}

export default PokemonCard;