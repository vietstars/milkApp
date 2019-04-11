import React, { Component } from 'react';
import { BrowserRouter, Route, Switch/*, Redirect*/ } from 'react-router-dom';
import './css/deploy.css';
import FarmMenu from './components/FarmMenu';
import FarmFooter from './components/FarmFooter';
import FarmDashboard from './components/FarmDashboard';
import CategoryInvoice from './components/FarmCategory';
import FarmInvoice from './components/FarmInvoice';
import FarmMilk from './components/FarmMilk';
import FarmLog from './components/FarmLog';
import Logo from './img/Logo.jpg';

class Farm extends Component {
  	render() {
	    return (
	    	<BrowserRouter>
			    <Route render={ (defaultProps) => <FarmMenu logo={Logo} {...defaultProps}/> } />
			    <Switch>
				    <Route path={"/farm/category"} component={ CategoryInvoice }/>
				    <Route path={"/farm/invoice"} component={ FarmInvoice }/>
				    <Route path={"/farm/milk"} component={ FarmMilk }/>
				    <Route path={"/farm/history"} component={ FarmLog }/>
				    <Route component={ FarmDashboard }/>
			    </Switch>
			    <Route component={FarmFooter}/>
		    </BrowserRouter>
	    );
  	}
}

export default Farm;
