import {createStore} from 'redux';
import reducers from '../redusers';
import {composeWithDevTools} from 'redux-devtools-extension';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const enhancedReducer = persistReducer(persistConfig, reducers);

export default function configureStore() {
  const store = createStore(enhancedReducer, composeWithDevTools());
  const persistor = persistStore(store);
  return {store, persistor};
}
