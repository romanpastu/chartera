import React from 'react';
import ChartContainer from './Chart/ChartContainer';
import Error from './Error/Error';
import './App.css';
import { Switch, Route, Redirect } from 'react-router';

const App: React.FC = function () {
  return (
    <Switch>
      <Route path="/" component={ChartContainer} exact />
      <Route path="/error" component={Error} />
      <Route path="/" render={() => <Redirect to="/" />} />
    </Switch>
  );
};

export default App;
