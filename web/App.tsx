/// <reference path="../global.d.ts" />

import './lib/fb';

import * as React from 'react';
import { render } from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore, routerMiddleware, routerReducer } from 'react-router-redux';

import Router from './routes/Router';
import './App.scss';

const reducer = combineReducers({
  routing: routerReducer
});
const reduxRouterMiddleware = routerMiddleware(browserHistory as any);
const createStoreWithMiddleware = applyMiddleware(thunk, reduxRouterMiddleware);
const store = createStore(reducer, createStoreWithMiddleware);

const history = syncHistoryWithStore(browserHistory as any, store);

class App extends React.Component<{}, {}> {
  render() {
    return (
      <Provider store={store}>
        <Router history={history} />
      </Provider>
    );
  }
}

// render
render(<App />, document.getElementById('app'));
