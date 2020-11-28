import { useState, useEffect } from 'react';
import axios from 'axios'; // Import the axios library
import { Link } from 'react-router-dom';

import PokermonImage from './PokemonImage';

// Import components
import Loading from '../components/Loading';

const Pokemons = () => {
  // Create a state for the launches data
  const [pokemons, setPokemons] = useState([]);

  //   const [pkimage, setImage] = useState([]);

  // To be more accurate, make a loading state
  const [loading, setLoading] = useState(true);

  // and an error state
  const [error, setError] = useState(undefined);

  // Call the SpaceX pokemons API when the pokemons component mounts
  useEffect(() => {
    console.log('pokemons component mounts');

    // To prevent flickers, you want your app to set a minimum load time
    window.setTimeout(() => {
      // Call the pokemons API
      axios
        .get('https://pokeapi.co/api/v2/pokemon?limit=151')
        .then((response) => {
          // Handle the successful response
          // console.log(response);
          const { data } = response;

          // You need to make this data available to the Component's JSX
          // When we get the API response with the appropriate data
          // update the state, the component will re-render with the state data saved (temp)
          setPokemons(data);

          // setPokemons([]); // Use this to pretend you get no data

          // Because the loading portion of the application is done
          setLoading(false);
        })
        .catch((error) => {
          // Handle any errors
          console.log(error.response);

          const { status, data } = error.response;

          // Set an error message in state
          setError(`${status} ${data}`);

          // The loading portion is done even in error
          setLoading(false);
        })
        .then(() => {
          console.log('More!');
        });
    }, 1500); // time is set in milliseconds
  }, []); // Put an empty dependency array to simulate mounting

  console.log(pokemons);

  return (
    <div>
      Pokemon Start
      {loading && <Loading />}
      {!loading && !error && pokemons.length === 0 && (
        <p className="lead text-center">There are currently no pokemons.</p>
      )}
      {!loading && error && <p className="lead text-center">{error}</p>}
      {!loading && !error && (
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              {/* <th>Details</th> */}
              <th>Success</th>
              <th>Date</th>
              <th>{pokemons.results.length}</th>
            </tr>
          </thead>
          <tbody>
            {pokemons.results.map((pokemon) => (
              <tr key={pokemon.name}>
                <td>{pokemon.name}</td>
                <td>
                  <PokermonImage
                    key={pokemon.name}
                    id={pokemon.name}
                    pkimage={pokemon.name}
                  />
                </td>
                {/* <PokermonImage></PokermonImage> */}
                {/* <td>{urlpokemon} ='tftf'</td> */}
                {/* <td>{'https://pokeapi.co/api/v2/pokemon/' + 1}</td> */}
                {/* <td>{`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`}</td> */}
                <td>
                  <Link to={`pokemon/${pokemon.name}`}>Details</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Pokemons;
