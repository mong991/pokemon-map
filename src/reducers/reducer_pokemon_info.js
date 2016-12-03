import { FETCH_POKEMON_INFO } from '../actions/index';

export default function (state = {}, action) {
    switch (action.type) {
        case FETCH_POKEMON_INFO:
            //return state.concat([action.payload.data]);
            //console.log("FETCH_POKEMON_INFO: ",action.payload);
            return { ...state, pokemonInfo: action.payload};
    }


    return state;
}