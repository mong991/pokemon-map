import { FETCH_POCKMON_SELECTED } from '../actions/index';

export default function (state = {}, action) {
    switch (action.type) {
        case FETCH_POCKMON_SELECTED:

            //return state.concat([action.payload.data]);
            //console.log("reducer: ",action.payload);
            return { ...state, pokemonId: action.payload};
    }


    return state;
}