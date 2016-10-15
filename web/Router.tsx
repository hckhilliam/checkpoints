import * as React from 'react';
import { connect } from 'react-redux';
import { Router as ReactRouter, Route, IndexRoute } from 'react-router';

import Root from './routes/Root';
import Home from './routes/Home';
import Dashboard from './routes/Dashboard';

export class Router extends React.Component<{}, {}> {
  componentWillMount() {

  }
  render() {
    // const history = { this.props };
    return (
      <ReactRouter>
        <Route path="/" component={Root}>
          <IndexRoute component={Home}/>
          <Route path="/dashboard" component={Dashboard}/>
        </Route>
      </ReactRouter>
    );

  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

const RouterContainer = connect(mapStateToProps, mapDispatchToProps)(Router);
export default RouterContainer;
