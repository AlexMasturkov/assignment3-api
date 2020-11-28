import React, { Component } from 'react';
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

class PokemonImage extends Component {
  state = {
    allimages: '',
  };

  componentDidMount() {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${this.props.pkimage}`)
      .then((response) => {
        console.log(response.data.sprites.back_default);
        this.setState({ allimages: response.data.sprites.back_default });
        console.log(this.allimages);
      });
  }

  render() {
    return (
      <div className="container">
        <div className="row m-0">
          {/* <div className="col-5 bg-warning">{this.props.pkimage}</div> */}
          {/* <div className="col-5 bg-warning">{this.state.allimages}</div> */}
          <img src={this.state.allimages} alt="" />
        </div>

        <hr />
      </div>
    );
  }
}

export default PokemonImage;
