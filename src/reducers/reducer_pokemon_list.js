import { FETCH_POCKMON_LIST } from '../actions/index';

export default function (state = {}, action) {
    switch (action.type) {
        case FETCH_POCKMON_LIST:
        
            return { ...state, list: action.payload.data.data};
    }


    return state;
}