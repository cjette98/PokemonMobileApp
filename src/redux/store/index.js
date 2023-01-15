import {legacy_createStore as createStore, applyMiddleware} from 'redux';
import reducer from '../reducers';
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: [
    'pokemon'
  ],
};

export default function configStore() {
    const logger = createLogger({ collapsed: true });
    const persistedReducer = persistReducer(persistConfig, reducer);
    const store = createStore(persistedReducer, applyMiddleware(thunk, logger));
    const persistor = persistStore(store);

    return { store, persistor };
    
}