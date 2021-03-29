import {createStore} from 'redux';
import reducers from '../redusers';
import {composeWithDevTools} from 'redux-devtools-extension';
export default function configureStore() {
  const store = createStore(reducers, composeWithDevTools());
  return store;
}
