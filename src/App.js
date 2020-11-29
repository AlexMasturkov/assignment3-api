import { Switch, Route, useRouteMatch } from 'react-router-dom';

import './App.css';

import Pokemons from './pages/Pokemons';
import PokemonDetails from './pages/PokemonDetails';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

function App() {
  // You can use match for dynamic generation of urls
  // Useful when nesting long URLs. (Optional for smaller applications)
  const match = useRouteMatch();

  return (
    <div className="container">
      <Header />
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
      <Footer />
    </div>
  );
}

export default App;
