import { GET_CRYPTOS, GET_UPDATED_CRYPTOS, GET_SUGGESTIONS_CRYPOTS, ADD_CRYPTO, DELETE_CRYPTO, CRYPTOS_LOADING  } from '../actions/crypto';

const initialState = {
    cryptos: [],
    suggestedCryptos: [],
    isLoading: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case CRYPTOS_LOADING: 
            return {
                ...state,
                isLoading: action.payload
            }
        case GET_CRYPTOS:
            return {
                ...state,
                cryptos: action.payload,
                isLoading: false
            }
        case GET_UPDATED_CRYPTOS:
            return {
                ...state,
                cryptos: action.payload
            }
        case GET_SUGGESTIONS_CRYPOTS:
            return {
                ...state,
                suggestedCryptos: action.payload
            }
        case ADD_CRYPTO:
            return {
                ...state,
                cryptos: [...state.cryptos, action.payload]
            }
        case DELETE_CRYPTO:
            return {
                ...state,
                cryptos: state.cryptos.filter(crypto => crypto.id !== action.id)
            }
        default:
            return state;
    }
};
