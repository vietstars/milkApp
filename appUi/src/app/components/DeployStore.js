import React, { Component } from 'react';
import Web3 from 'web3';
import { GET } from '../sys/AppResource';
import DeployNotification from './DeployNotification';
// import { MDBDataTable } from 'mdbreact';

class DeployStore extends Component {
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
	    await GET('logged/').then((res)=>{
	    	this.setState({ visited:res.length })
	    })
	    await GET('farm/').then((res)=>{
	    	this.setState({ farm:res.length })
	    })
	    await GET('factory/').then((factory)=>{
	    	this.setState({ factory })
	    })
	    await GET('store/').then((res)=>{
	    	this.setState({ store:res.length })
	    })
  	}
  	render() {
	    return (
	      	<main className="pt-5 mx-lg-5">
				<div className="container-fluid mt-5">
					<div className="card mb-4 wow fadeIn">
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
					  	<div className="col-md-9 mb-4">
						    <div className="card">
						      	<div className="card-header">Your processing</div>
						      	<div className="card-body">
						      		<h1>Store</h1>
						    	</div>
						    </div>        
				  	  	</div>
				  		<DeployNotification visited={this.state.visited} farm={this.state.farm} factory={this.state.factory.length} store={this.state.store}/>
				  	</div>
				</div>
		    </main>
	    );
  	}
}

export default DeployStore;
