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
import Navbar from './app/components/Navbar';

import * as serviceWorker from './serviceWorker';

ReactDOM.render(
	<BrowserRouter>
		<Route component={Navbar}/>
        <Switch>
          <Route path={"/"} component={ Home } exact/>
          <Route path={"/user"} component={ Deploy }/>
          <Route path={"/login"} component={ Login }/>
          <Route component={ Home }/>
        </Switch>
  	</BrowserRouter>
	, document.getElementById('root')
);

serviceWorker.unregister();
