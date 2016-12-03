import { combineReducers } from 'redux';
import selectPockmonReducers from './reducer_select_pockmon';
import reducerPokemonList from './reducer_pokemon_list';
import reducerMapInfo from './reducer_map_info';
import reducerPokemonInfo from './reducer_pokemon_info';

const rootReducer = combineReducers({
  selectPockmon: selectPockmonReducers,
  pokemonList: reducerPokemonList,
  mapInfo: reducerMapInfo,
  windowPokemonInfo: reducerPokemonInfo
});

export default rootReducer;
