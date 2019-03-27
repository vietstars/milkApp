import React, { Component } from 'react';
import { BrowserRouter, Route, Switch/*, Redirect*/ } from 'react-router-dom';
import Web3 from 'web3';
// import {APP_LIST_ABI,APP_LIST_ADDRESS} from './sys/DalatMilk';
import {GET,RMO} from './sys/AppResource';
// import swal from 'sweetalert';
import './css/deploy.css';
import DeployMenu from './components/DeployMenu';
import DeployFooter from './components/DeployFooter';
import DeployDashboard from './components/DeployDashboard';
import DeployFarm from './components/DeployFarm';
import DeployFactory from './components/DeployFactory';
import DeployStore from './components/DeployStore';
import Logo from './img/Logo.jpg';


class Deploy extends Component {

	componentWillMount(){
<<<<<<< HEAD
		this.loadBlockchainData()
=======
		//this.setState({isLogged:true})
>>>>>>> e628e61727cfbd2e968661ce9bd4cf8dd7589fd4
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
	    await GET('logged/'+this.state.account).then((res)=>{
	    	if(res.exp>Date.now()){
	    		this.setState({isLogged:true})
	    	}else{
	    		RMO('logged/'+this.state.account).then((res)=>{
					window.location.href='../login'
				})
	    	}
	    })
  	}

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
