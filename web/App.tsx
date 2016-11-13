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

import checkpoints from './reducers/checkpointsReducer';
import user from './reducers/userReducer';
import events from './reducers/eventsReducer';
import friends from './reducers/friendsReducer';

import { initializeAuth } from './lib/auth';

initializeAuth();

const reducer = combineReducers({
  checkpoints,
  user,
  friends,
  routing,
  form,
  events
});

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
}

// render
render(<App />, document.getElementById('app'));
