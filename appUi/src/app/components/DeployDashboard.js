import React, { Component } from 'react';
import Deploybg from '../img/Deploy-processing.jpg';
import Web3 from 'web3';
import { GET } from '../sys/AppResource';
import DeployNotification from './DeployNotification';
import { MDBDataTable } from 'mdbreact';

class DeployDashboard extends Component {

	componentWillMount(){
		this.loadBlockchainData()
  	}

	constructor(props){
	    super(props)
	    this.state = {
	      	visited: 0,
	      	farm: 0,
	      	factory: 0,
	      	store: 0
	    }
  	}

  	async loadBlockchainData(){
	    const web3 = new Web3(Web3.givenProvider || "http://localhost:7545")
	    // const dalatMilk = new web3.eth.Contract(APP_LIST_ABI,APP_LIST_ADDRESS )
	    await web3.eth.getCoinbase((eror,account)=>{
	    	this.setState({ account })
	    })
	    await GET('logged/').then((visited)=>{
	    	visited.map((v)=>{return v.exp = new Date((v.exp/1e3)-7200).toLocaleString()});
	    	this.setState({ visited })
	    })
	    await GET('farm/').then((res)=>{
	    	this.setState({ farm:res.length })
	    })
	    await GET('factory/').then((res)=>{
	    	this.setState({ factory:res.length })
	    })
	    await GET('store/').then((res)=>{
	    	this.setState({ store:res.length })
	    })
  	}

  	render() {
	  	const visited = {
	    	columns: [
		      {
		        label: 'Address',
		        field: 'id',
		        width: '70%'
		      },
		      {
		        label: 'Visited at',
		        field: 'exp',
		        width: '30%'
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
					  	<DeployNotification visited={this.state.visited.length} farm={this.state.farm} factory={this.state.factory} store={this.state.store}/>
					  	<div className="col-md-9 mb-4">
						    <div className="card">
						      	<div className="card-header">Multiple Apartment</div>
						      	<div className="card-body customer-style">
							      <img src={Deploybg} className="img-fluid" alt="" />
							      <h1 className="text-center">Coming Soon</h1>
							      <MDBDataTable striped hover data={visited} />
							    </div>
						    </div>        
				  		</div>	
					</div>
				</div>
		    </main>
	    );
  	}
}

export default DeployDashboard;
