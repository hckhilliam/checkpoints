import * as React from 'react';
import { render } from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore, routerMiddleware, routerReducer } from 'react-router-redux';

var reducer = combineReducers({
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
        <h1 style={{fontSize: 128, color: 'green'}}>Hello friends!</h1>
      </Provider>
    );
  }
}

// render
render(<App />, document.getElementById('app'));
