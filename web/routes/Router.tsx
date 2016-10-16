import * as React from 'react';
import { connect } from 'react-redux';
import { Router as ReactRouter, Route, IndexRoute } from 'react-router';

import Root from './Root';
import Home from './Home';

interface Props {
  history: ReactRouterRedux.ReactRouterReduxHistory,
}

export class Router extends React.Component<Props, {}> {
  componentWillMount() {
    // Remove #_=_ from url
    if (window.location.hash == '#_=_') {
      history.replaceState
        ? history.replaceState(null, null, window.location.href.split('#')[0])
        : window.location.hash = '';
    }
  }

  render() {
    const { history } = this.props;
    return (
      <ReactRouter history={history}>
        <Route path="/" component={Root}>
          <IndexRoute component={Home} />
        </Route>
      </ReactRouter>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {}
};

const RouterContainer = connect(mapStateToProps, mapDispatchToProps)(Router);
export default RouterContainer;
