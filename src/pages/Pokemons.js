import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Pokemon.css';

import PokermonImage from './PokemonImage';
import Loading from '../components/Loading';

const Pokemons = () => {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(undefined);

  useEffect(() => {
    // console.log('pokemons component mounts');
    window.setTimeout(() => {
      // Call the pokemons API
      axios
        .get('https://pokeapi.co/api/v2/pokemon?limit=151')
        .then((response) => {
          const { data } = response;
          setPokemons(data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error.response);
          const { status, data } = error.response;
          setError(`${status} ${data}`);
          setLoading(false);
        })
        .then(() => {
          // console.log('More!');
        });
    }, 1200); // time is set in milliseconds
  }, []); // Put an empty dependency array to simulate mounting
  // console.log(pokemons);

  return (
    <section className="container">
      {loading && <Loading />}
      {!loading && !error && pokemons.length === 0 && (
        <p className="lead text-center">There are currently no pokemons.</p>
      )}
      {!loading && error && <p className="lead text-center">{error}</p>}
      {!loading && !error && (
        <div className="d-flex justify-content-center row ">
          {pokemons.results.map((pokemon) => (
            <div key={pokemon.name}>
              <div className="card my-card mt-1 mr-1">
                <Link to={`pokemon/${pokemon.name}`}>
                  {' '}
                  <PokermonImage
                    key={pokemon.name}
                    id={pokemon.name}
                    pkimage={pokemon.name}
                  />
                  <div className="card-img-overlay p-0">
                    <p class="card-title text-center rounded shadow p-0">
                      {pokemon.name}
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
export default Pokemons;
