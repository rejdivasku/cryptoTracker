import React from "react";
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import cryptoReducer from './store/reducers/crypto';
import Navigator from './Navigator';

const rootReducer = combineReducers({
  crypto: cryptoReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  return (
    <Provider store={store}>
        <Navigator />
    </Provider>
  );
}
