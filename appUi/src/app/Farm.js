import React, { Component } from 'react';
import { BrowserRouter, Route, Switch/*, Redirect*/ } from 'react-router-dom';
import Web3 from 'web3';
// import {APP_LIST_ABI,APP_LIST_ADDRESS} from './sys/DalatMilk';
import {LOGGED,GET,DEL} from './sys/AppResource';
// import swal from 'sweetalert';
import './css/deploy.css';
import FarmMenu from './components/FarmMenu';
import FarmFooter from './components/FarmFooter';
import FarmDashboard from './components/FarmDashboard';
import FarmInvoice from './components/FarmInvoice';
import FarmLog from './components/FarmLog';
import Logo from './img/Logo.jpg';


class Farm extends Component {

	componentWillMount(){
		this.loadBlockchainData()
  	}

	constructor(props){
	    super(props)
	    this.state = {
	      	isLogged: false,
	    }
  	}

  	async loadBlockchainData(){
	    const web3 = new Web3(Web3.givenProvider || "http://localhost:7545")
	    // const dalatMilk = new web3.eth.Contract(APP_LIST_ABI,APP_LIST_ADDRESS )
	    await web3.eth.getCoinbase((eror,account)=>{
	    	this.setState({ account })
	    })
	    await GET(LOGGED+this.state.account).then((res)=>{
	    	if(res.exp>Date.now()){
	    		this.setState({isLogged:true})
	    	}else{
	    		DEL(LOGGED+this.state.account).then((res)=>{
					window.location.href='../login'
				})
	    	}
	    })
  	}

  	render() {
	    return (
	    	<BrowserRouter>
			    <Route render={ (defaultProps) => <FarmMenu logo={Logo} {...defaultProps}/> } />
			    <Switch>
				    <Route path={"/farm/invoice"} component={ FarmInvoice }/>
				    <Route path={"/farm/history"} component={ FarmLog }/>
				    <Route component={ FarmDashboard }/>
			    </Switch>
			    <Route component={FarmFooter}/>
		    </BrowserRouter>
	    );
  	}
}

export default Farm;
