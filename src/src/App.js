import React from 'react';
import './App.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateComponent from './components/PrivateComponent';
import PrivateRoute from './components/PrivateRoute';
import { createStore, applyMiddleware } from 'redux';

import { gameReducer as reducer } from './reducers/gameReducer';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import LoginPage from './components/userProcess/LoginPage'
import Dashboard from './components/Dashboard'

const store = createStore(reducer, applyMiddleware(thunk));

function App() {

  return (
    <Router>
      <Provider store={store}>

        <div className="App">

          <Switch>
            <Route path="/" component={LoginPage} />
            <PrivateRoute path='/dash' component={Dashboard} />
          </Switch>

        </div>

      </Provider>
    </Router>
  );
}

export default App;
