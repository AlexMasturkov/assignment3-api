import React, { Component } from 'react';
import axios from 'axios';

class PokemonImage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: '',
      allimages: '',
      error: '',
    };
  }
  setError = (element) => {
    this.setState({
      error: element.target.value,
    });
  };
  setLoading = (element) => {
    this.setState({
      loading: element.target.value,
    });
  };

  componentDidMount() {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${this.props.pkimage}`)
      .then((response) => {
        this.setState({ allimages: response.data.sprites.back_default });
      })
      .catch((error) => {
        // console.log(error.response);
        const { status, data } = error.response;
        this.setLoading(false);
        this.setError(`${status} ${data}`);
      });
  }
  render() {
    return (
      <img className="card-img mb-3" src={this.state.allimages} alt="pokemon" />
    );
  }
}

export default PokemonImage;
