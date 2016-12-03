import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchSelectPockmon } from '../actions/index';

import { pokemonInfo } from '../data/pokemonInfo';

class SearchBar extends Component {
	constructor(props){
		super(props);
        
        this.state = { selected: '0' };
        this.props.fetchSelectPockmon(this.state.selected);
	}

    change(event) {
        this.setState( { selected: event.target.value} );
        this.props.fetchSelectPockmon(event.target.value);
    }

    pokemonList(){
         let pokemons;
         pokemons = Object.keys(pokemonInfo).map((pokemon, index) => {
             const pokemonName = pokemonInfo[pokemon].name;
             return( <option key= {`select_${pokemon}`} value = {pokemon} >{`no.${pokemon}-${pokemonName}`}</option> );
         })

         return pokemons;
    }    

	render(){
        //console.log("selectedId=>" ,this.state.selected );
		return (
            <div>
                <div><h3  className="search-bar" >Pokemon go Radar</h3></div>
                <div className="search-bar">
                    <select onChange={this.change.bind(this)} value={this.state.selected}>
                        <option value="0">All</option>
                        {this.pokemonList()}
                    </select>
                </div>
            </div>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({fetchSelectPockmon}, dispatch);
}

export default connect(null, mapDispatchToProps)(SearchBar);
