/**
 * @format
 */

import 'react-native-gesture-handler';

import {AppRegistry, AsyncStorage} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';

import App from './App';
// import {name as appName} from './app.json';

// AppRegistry.registerComponent("banlistinfo", () => App);



import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,

  split, HttpLink
} from "@apollo/client";
import { relayStylePagination, getMainDefinition } from "@apollo/client/utilities"
import { setContext } from '@apollo/client/link/context';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { createUploadLink } from 'apollo-upload-client' // v15.0.0


import { HOST_GRAPHAL } from './constants';


const wsLink = new GraphQLWsLink(createClient({
  url: 'ws://'+ HOST_GRAPHAL +'/graphql',
  
  /*
  // reconnect: true,
  disablePong: false,
  connectionAckWaitTimeout: 0,
  retryAttempts: 5,
  keepAlive: 10,
  retryWait: async function randomisedExponentialBackoff(retries) {

    console.log("wsLink retryWait")
    let retryDelay = 1000; // start with 1s delay
    for (let i = 0; i < retries; i++) {
      retryDelay *= 2;
    }
    await new Promise((resolve) =>
      setTimeout(
        resolve,
        retryDelay +
          // add random timeout from 300ms to 3s
          Math.floor(Math.random() * (3000 - 300) + 300),
      ),
    );
  },
  shouldRetry: (errOrCloseEvent) => {
    console.log("wsLink shouldRetry :")
    return true;
  },
  connectionParams: {
    authToken: "localStorage.getItem('token')",
    textHeaders: "axxxx2"
  },
  on: {
    // connected: () => console.log("connected client"),
    connecting: () => {
      // this.setState({ socketStatus: 'connecting' });
      // console.log("wsLink connecting");

      connecting(true)
    },
    closed: () =>{
      // console.log("wsLink closed");
      activeSocket =null
      connecting(false)
    } ,
    connected: (socket) =>{
      activeSocket = socket

      // console.log("wsLink connected client", socket);

      // gracefullyRestart = () => {
      //   if (socket.readyState === WebSocket.OPEN) {
      //     socket.close(4205, 'Client Restart');

      //     console.log("gracefullyRestart #1")
      //   }
      // };

      // // just in case you were eager to restart
      // if (restartRequestedBeforeConnected) {
      //   restartRequestedBeforeConnected = false;
      //   gracefullyRestart();

      //   console.log("gracefullyRestart #2")
      // }
    },
    keepAlive: 10, // ping server every 10 seconds
    ping: (received) => {
      console.log("wsLink #0")

      if (!received){
        console.log("#1")
        timedOut = setTimeout(() => {
          if (activeSocket.readyState === WebSocket.OPEN){
            activeSocket.close(4408, 'Request Timeout');
          }
            
        }, 5); // wait 5 seconds for the pong and then close the connection
      } // sent
    },
    pong: (received) => {
      console.log("wsLink #4")

      if (received){
        clearTimeout(timedOut); // pong is received, clear connection close timeout
      } 
    },
  },
  */
}));


// const httpLink = createHttpLink({
//   uri: 'https://banlist.info/graphql'
// });


// The split function takes three parameters:
//
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  // httpLink,
  // authLink.concat(httpLink),
  createUploadLink({ uri: "http://"+ HOST_GRAPHAL +"/graphql", // 
                    headers:{ authorization:  "xxx", } })
);


//////////////////

// Initialize Apollo Client
const client = new ApolloClient({
  // uri: 'https://flyby-gateway.herokuapp.com/',
  link: splitLink,

  // uri: "http://192.168.43.99:4000/graphql",    // << localhost use ip [android] and localhost[ios]
  // uri: "http://157.245.51.177:4000/graphql",   
  cache: new InMemoryCache(),
  onError: ({ networkError, graphQLErrors }) => {
    console.log("graphQLErrors", graphQLErrors)
    console.log("networkError", networkError)
  },
  debug: true
});


//////////////// redux /////////////////
import { applyMiddleware, legacy_createStore as createStore, combineReducers, compose  } from "redux";
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";    // Logger with default options

// persist
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter, Switch } from "react-router-dom";
import storage from '@react-native-async-storage/async-storage';

import reducers from "./redux/reducers";

const persistConfig = {
  key: "root",
  storage
};

const reducer = persistReducer(persistConfig, reducers);
// persist

// https://github.com/LogRocket/redux-logger/issues/6
const logger = createLogger({
  predicate: () => process.env.REACT_APP_NODE_ENV !== "development",
});

let middleware = [];
// if (process.env.REACT_APP_NODE_ENV === 'development') {
  middleware = [...middleware, thunk, logger];
// } else {
//   middleware = [...middleware, thunk];
// }

// thunk
const store = createStore(reducer, compose(applyMiddleware(...middleware)) /*applyMiddleware(thunk, logger)*/);
const persistor = persistStore(store);
//////////////// redux /////////////////

const AppX = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      {/* <NavigationContainer> */}
        <ApolloProvider client={client}>
          <App />
        </ApolloProvider>
      {/* </NavigationContainer> */}
    </PersistGate>
  </Provider>
);

AppRegistry.registerComponent("banlistinfo", () => AppX);
