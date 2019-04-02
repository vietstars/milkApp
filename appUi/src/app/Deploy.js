import React, { Component } from 'react';
import { BrowserRouter, Route, Switch/*, Redirect*/ } from 'react-router-dom';
import './css/deploy.css';
import DeployMenu from './components/DeployMenu';
import DeployFooter from './components/DeployFooter';
import DeployDashboard from './components/DeployDashboard';
import DeployFarm from './components/DeployFarm';
import DeployFactory from './components/DeployFactory';
import DeployStore from './components/DeployStore';
import Logo from './img/Logo.jpg';


class Deploy extends Component {

  	render() {
	    return (
	    	<BrowserRouter>
			    <Route render={ (defaultProps) => <DeployMenu logo={Logo} {...defaultProps}/> } />
			    <Switch>
				    <Route path={"/user/farm"} component={ DeployFarm }/>
				    <Route path={"/user/factory"} component={ DeployFactory }/>
				    <Route path={"/user/store"} component={ DeployStore }/>
				    <Route component={ DeployDashboard }/>
			    </Switch>
			    <Route component={DeployFooter}/>
		    </BrowserRouter>
	    );
  	}
}

export default Deploy;
