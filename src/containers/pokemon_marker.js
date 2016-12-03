import React, { Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class PokemonMarker extends Component {
    

    render() {
        const { pokemonState } = this.props;
        console.log(pokemonState);
        return (
           <OverlayView {...pokemonState} >
                <div className="pokemon" onClick={this.handlePokemonClick.bind(this, pokemonState) } >
                    <img src={imgUrl} height="70" width="70" />
                    <div className="poke-timer">123</div>
                </div>
            </OverlayView>
        );
    }
}

export default PokemonMarker;