import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './PokemonDetails.css';

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
    }, 1000);
  }, []); // Empty dependency array for mounting effects

  // console.log(pokemon);

  return (
    <section>
      {loading && <Loading />}
      {!loading && error && (
        <div className="text-center">
          <p className="lead">{error}</p>
          <Link to="/" className="btn warning">
            Go Back
          </Link>
        </div>
      )}
      {!loading && !error && pokemon && (
        <div className="pokemon-card card text-center p-1 mb-4 shadow">
          <div className=" bg-light p-1">
            <h4 className="card header p-2 text-white">{pokemon.name}</h4>
            <img
              className="my-image"
              src={pokemon.sprites.back_default}
              alt=""
            />
            <div>Height: {pokemon.height || '--'}</div>
            <div>Base experience: {pokemon.base_experience || '--'}</div>
            <div>Weight: {pokemon.weight || '--'}</div>
            <p className="text-center">
              {' '}
              {pokemon.stats.map((item, index) => (
                <div className="" key={index}>
                  {' '}
                  Base: {item.base_stat} Name: {item.stat.name}{' '}
                </div>
              ))}
            </p>

            <Link to="/" className="btn btn-primary mb-2 text-white">
              Go Back
            </Link>
          </div>
        </div>
      )}
    </section>
  );
};

export default PokemonDetails;
