import React, { Component } from 'react';
import SearchBar from '../containers/search_bar';
import GoogleMap from '../containers/google_map';
import PokemonList from '../containers/pokemon_list';

export default class App extends Component {
  render() {

    return (
      <div>
          <SearchBar />
          <GoogleMap />
          <PokemonList/>
      </div>
    );
  }
}
