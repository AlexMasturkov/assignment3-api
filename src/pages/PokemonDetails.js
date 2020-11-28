import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

import Loading from '../components/Loading';

const PokemonDetails = () => {
  // We want to capture the pokemonName from the URL
  const { pokemonId } = useParams();

  // Setup the states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(undefined);
  const [pokemon, setPokemon] = useState(undefined);

  useEffect(() => {
    setTimeout(() => {
      axios
        .get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
        .then((response) => {
          const { data } = response;
          console.log(data);
          setPokemon(data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error.response);
          const { status, data } = error.response;
          setLoading(false);
          setError(`${status} ${data}`);
        });
    }, 1500);
  }, []); // Empty dependency array for mounting effects

  console.log(pokemon);

  return (
    <div>
      {loading && <Loading />}
      {!loading && error && (
        <div className="text-center">
          <p className="lead">{error}</p>
          <Link to="/" className="btn btn-primary">
            Go Back
          </Link>
        </div>
      )}
      {!loading && !error && pokemon && (
        <div>
          <h3>{pokemon.name}</h3>
          <img src={pokemon.sprites.back_default} alt="" />
          {/* <p>{pokemon.details ? pokemon.details : '--'}</p> */}
          <p>{pokemon.details || '--'}</p>
          <Link to="/" className="btn btn-primary">
            Go Back
          </Link>
        </div>
      )}
    </div>
  );
};

export default PokemonDetails;
