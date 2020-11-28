import { Switch, Route, useRouteMatch } from 'react-router-dom';

import './App.css';

import Pokemons from './pages/Pokemons';
import PokemonDetails from './pages/PokemonDetails';

function App() {
  // You can use match for dynamic generation of urls
  // Useful when nesting long URLs. (Optional for smaller applications)
  const match = useRouteMatch();

  return (
    <div className="app">
      <div className="container">
        <div className="text-center">
          <h1 className="my-3">Pokemon</h1>
          <p className="lead">Welcome to our Pokemon Api application!</p>
        </div>
        <Switch>
          {/* in route paths, especially in Javascript, anything prefixed with a : means it's a variable.
              e.g. :id
          */}

          {/* Need to fix route */}
          <Route exact path={`${match.url}pokemon/:pokemonId`}>
            <PokemonDetails />
          </Route>
          <Route exact path={match.url}>
            <Pokemons />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
