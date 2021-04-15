import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { mapOrder } from '../../utils';

const URL = 'https://data.messari.io/api/v1/assets';

export const GET_CRYPTOS = 'GET_CRYPTOS';
export const GET_UPDATED_CRYPTOS = 'GET_UPDATED_CRYPTOS';
export const GET_SUGGESTIONS_CRYPOTS = 'GET_SUGGESTIONS_CRYPOTS';
export const ADD_CRYPTO = 'ADD_CRYPTO';
export const DELETE_CRYPTO = 'DELETE_CRYPTO';
export const CRYPTOS_LOADING = 'CRYPTOS_LOADING';

export const getCryptos = (isLoading) => {
    return async (dispatch) => {
        dispatch(setCryptosLoading(isLoading));
        const request = await AsyncStorage.getItem('cryptos');

        dispatch({
            type: GET_CRYPTOS,
            payload: typeof JSON.parse(request) === "object" ? JSON.parse(request) : []
        });
    };
};

export const getUpdatedCryptos = () => {
    return async (dispatch, getState) => {
        const cryptos = getState().crypto.cryptos;
        const request = await axios.get(URL)
                    .then(response => {
                        return response.data.data;
                    });
        
        let ids = [];
        if(cryptos && cryptos.length > 0) {
            ids = cryptos.map(c => c.id);
        }
        let resData = request.filter(({id}) => ids.includes(id));
        let orderedData = mapOrder(resData, ids, 'id');

        dispatch({
            type: GET_UPDATED_CRYPTOS,
            payload: orderedData
        });
    };
}

export const getSuggestionsCryptos = () => {
    return async (dispatch, getState) => {
        const cryptos = getState().crypto.cryptos;
        const request = await axios.get(URL)
                    .then(response => {
                        return response.data.data;
                    });
        
        let ids = [];
        if(cryptos && cryptos.length > 0) {
            ids = cryptos.map(c => c.id);
        }
        let resData = request.filter(({id}) => !ids.includes(id));

        dispatch({
            type: GET_SUGGESTIONS_CRYPOTS,
            payload: resData
        });
    };
}

export const addCrypto = (item) => {
    return async (dispatch, getState) => {
        dispatch({
            type: ADD_CRYPTO,
            payload: item
        });
        
        const cryptos = getState().crypto.cryptos;
        await AsyncStorage.setItem('cryptos', JSON.stringify(cryptos));
    };
};

export const deleteCrypto = (id) => {
    return async (dispatch, getState) => {
        dispatch({
            type: DELETE_CRYPTO,
            id
        });

        const cryptos = getState().crypto.cryptos;
        await AsyncStorage.setItem('cryptos', JSON.stringify(cryptos));
    };
};

export const setCryptosLoading = (payload) => {
    return {
        type: CRYPTOS_LOADING,
        payload
    }
}