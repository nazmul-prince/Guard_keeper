import {
    GET_ALL_GUARDS,
    ADD_GUARD,
    UPDATE_GUARD,
    DELETE_GUARD,
    GUARD_ERROR
} from '../types';

export default (state, action) => {
    switch (action.type) {
        case GET_ALL_GUARDS:
            return {
                ...state,
                guards: action.payload,
                loading: false
            };
        case ADD_GUARD:
            return {
                ...state,
                guards: [action.payload, ...state.guards]
        };
        case UPDATE_GUARD:
            return {
                ...state,
                guards: state.guards.map(guard => guard._id === action.payload._id ? action.payload : guard)
        };
        case DELETE_GUARD:
            return {
                ...state,
                guards: state.guards.filter(guard => guard._id !== action.payload)
        };
        case GUARD_ERROR:
            return {
                ...state,
                error: action.payload
            };
        default:
            return state;
    }
}
