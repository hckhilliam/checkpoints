/// <reference path="./typings/global.d.ts" />
import './App.scss';

import * as React from 'react';
import { render } from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore, routerMiddleware, routerReducer as routing } from 'react-router-redux';
import { reducer as form } from 'redux-form';

import Router from './routes/Router';

import { RESET } from './actions/global';

import checkpoints from './reducers/checkpointsReducer';
import dialog from './reducers/dialogReducer';
import dropdownlist from './reducers/dropdownlistReducer';
import events from './reducers/eventsReducer';
import flights from './reducers/flightReducer';
import friends from './reducers/friendsReducer';
import overlay from './reducers/overlayReducer';
import search from './reducers/searchReducer';
import users from './reducers/usersReducer';

import { initializeAuth } from './lib/auth';

initializeAuth();

const combinedReducer = combineReducers({
  checkpoints,
  friends,
  routing,
  form,
  events,
  flights,
  search,
  overlay,
  dialog,
  dropdownlist,
  users
});

const reducer = (state, action) => {
  if (action.type == RESET)
    state = undefined;

  return combinedReducer(state, action);
};

const reduxRouterMiddleware = routerMiddleware(browserHistory as any);
const createStoreWithMiddleware = applyMiddleware(thunk, reduxRouterMiddleware);
const store = createStore(reducer, createStoreWithMiddleware);

const history = syncHistoryWithStore(browserHistory as any, store);

const App = () => {
  return (
    <Provider store={store}>
      <Router history={history} />
    </Provider>
  );
};

// render
render(<App />, document.getElementById('app'));
