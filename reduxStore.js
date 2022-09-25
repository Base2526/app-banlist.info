import reducers from './reducers'
import { createLogger } from 'redux-logger'
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'

import storage from '@react-native-async-storage/async-storage';

// persist
import { persistStore, persistReducer } from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage,
}

var rds = persistReducer(persistConfig, reducers);
// persist


const middleware = [ thunk ];

if (process.env.NODE_ENV === 'development') {
  // middleware.push(createLogger())
}

const logger = createLogger({
  predicate: () => process.env.NODE_ENV !== 'development'
});

const store = createStore(rds, applyMiddleware(...middleware));
const persistor = persistStore(store);

export {store, persistor};