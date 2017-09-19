import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import promise from 'redux-promise';
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import reducers from './reducers/index';

import Layout from './Layout.js';
import './index.css';

let createStoreWithMiddleware = applyMiddleware(promise, thunkMiddleware)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Layout}>
        </Route>
      </Switch>
    </BrowserRouter>
  </Provider>
, document.getElementById('root'))
