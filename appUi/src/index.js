import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import './index.css';
import Login from './app/Login';
import Deploy from './app/Deploy';
import Home from './app/Home';
import Register from './app/Register';
import Navbar from './app/components/Navbar';
import { CookiesProvider } from 'react-cookie';

import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <CookiesProvider>
	  <BrowserRouter>
	    <Route component={Navbar}/>
      <Switch>
        <Route path={"/"} component={ Home } exact/>
        <Route path={"/user"} component={ Deploy }/>
        <Route path={"/login"} component={ Login }/>
        <Route path={"/register"} component={ Register }/>
        <Route component={ Home }/>
      </Switch>
  	</BrowserRouter>
  </CookiesProvider>
	, document.getElementById('root')
);

serviceWorker.unregister();
