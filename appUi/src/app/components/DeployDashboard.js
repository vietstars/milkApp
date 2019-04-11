import React, { Component } from 'react';
import Deploybg from '../img/Deploy-processing.jpg';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import Web3 from 'web3';
import { LOGGED,DRAFF,FARM,FACTORY,STORE,GET,HEADERS } from '../sys/AppResource';
import DeployNotification from './DeployNotification';
import { MDBDataTable } from 'mdbreact';

class DeployDashboard extends Component {

	static propTypes = {
	    cookies: instanceOf(Cookies).isRequired
  	};

	componentWillMount(){
		this.loadBlockchainData()
  	}

	constructor(props){
	    super(props)
	    const { cookies } = props;
	    let token = cookies.get('logged')
	    let userToken = cookies.get('userToken')
	    let authorization = 'milkApp '+token
	    let loggedHeader = {...HEADERS,authorization}
	    authorization = 'milkApp '+userToken
	    let userHeader = {...HEADERS,authorization}
	    this.state = {
	      	visited: 0,
	      	farm: [],
	      	factory: [],
	      	store: [],
	      	farmCount: 0,
			factoryCount: 0,
			storeCount: 0,
			loggedHeader:loggedHeader,
			userHeader:userHeader
	    }
  	}

  	async loadBlockchainData(){
	    const web3 = new Web3(Web3.givenProvider || "http://localhost:7545")
	    // const dalatMilk = new web3.eth.Contract(APP_LIST_ABI,APP_LIST_ADDRESS )
	    await web3.eth.getCoinbase((eror,account)=>{
	    	this.setState({ account })
	    })
	    await GET(LOGGED, this.state.loggedHeader).then((visited)=>{
	    	visited.map((v)=>{return v.exp = new Date((v.exp+Math.log10(0.1)*36*1e2)*1e3).toLocaleString()});
	    	this.setState({ visited })
	    })
	    await GET(DRAFF, this.state.loggedHeader).then((res)=>{
	    	let farm = [];
	    	let factory = [];
	    	let store = [];
	    	res.map((e)=>{e.apartment===2?farm.push(e):(e.apartment===3?factory.push(e):store.push(e));return true})
	    	this.setState({ farm, factory, store });
	    })
	    await GET(FARM,this.state.userHeader).then((res)=>{
	    	let farmCount = res.length
	    	this.setState({ farmCount })
	    })
	    await GET(FACTORY,this.state.userHeader).then((res)=>{
	    	let factoryCount = res.length
	    	this.setState({ factoryCount })
	    })
	    await GET(STORE,this.state.userHeader).then((res)=>{
	    	let storeCount = res.length
	    	this.setState({ storeCount })
	    })
  	}

  	render() {
	  	const visited = {
	    	columns: [
		      {
		        label: 'Visited at',
		        field: 'exp',
		        width: '10'
		      },
		      {
		        label: 'Address',
		        field: 'id',
		        width: '80'
		      }],
		    rows: this.state.visited
	  	}
	    return (
	      	<main className="pt-5 mx-lg-5">
				<div className="container-fluid mt-5">
					<div className="card wow fadeIn">
					  <div className="card-body d-sm-flex justify-content-between">
					    <h4 className="mb-2 mb-sm-0 pt-1">
					      <a href="#123" target="_blank">Deploy</a>
					      <span>/</span>
					      <span>Dashboard</span>
					    </h4>
					    <form className="d-flex justify-content-center">
					      <input type="search" placeholder="Type your query" aria-label="Search" className="form-control" />
					      <button className="btn btn-primary btn-sm my-0 p" type="submit">
					        <i className="fas fa-search"></i>
					      </button>
					    </form>
					  </div>
					</div>
					<div className="row wow fadeIn">
					  	<div className="col-md-9">
						    <div className="card">
						      	<div className="card-header">App Visited</div>
						      	<div className="card-body customer-style">
							      <img src={Deploybg} className="img-fluid" alt="" />
							      <MDBDataTable striped hover data={visited} />
							    </div>
						    </div>        
				  		</div>				
					  	<DeployNotification visited={this.state.visited.length} farm={this.state.farm.length} factory={this.state.factory.length} store={this.state.store.length} farmCount={this.state.farmCount} factoryCount={this.state.factoryCount} storeCount={this.state.storeCount} />
					</div>
				</div>
		    </main>
	    );
  	}
}

export default withCookies(DeployDashboard);
