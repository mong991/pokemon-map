import { FETCH_MAP_INFO } from '../actions/index';

export default function (state = {}, action) {
    switch (action.type) {
        case FETCH_MAP_INFO:
            //return state.concat([action.payload.data]);
            //console.log("reducer_map: ",action.payload);
            return { ...state, info: action.payload};
    }


    return state;
}