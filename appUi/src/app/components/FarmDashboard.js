import React, { Component } from 'react';
import Farmbg from '../img/Farm-processing.jpg';
import Web3 from 'web3';
import { LOGGED,DRAFF,GET } from '../sys/AppResource';
import DeployNotification from './DeployNotification';
import { MDBDataTable } from 'mdbreact';

class FarmDashboard extends Component {

	componentWillMount(){
		this.loadBlockchainData()
  	}

	constructor(props){
	    super(props)
	    this.state = {
	      	visited: 0,
	      	farm: [],
	      	factory: [],
	      	store: []
	    }
  	}

  	async loadBlockchainData(){
	    const web3 = new Web3(Web3.givenProvider || "http://localhost:7545")
	    // const dalatMilk = new web3.eth.Contract(APP_LIST_ABI,APP_LIST_ADDRESS )
	    await web3.eth.getCoinbase((eror,account)=>{
	    	this.setState({ account })
	    })
	    await GET(LOGGED).then((visited)=>{
	    	visited.map((v)=>{return v.exp = new Date((v.exp/1e3)-7200).toLocaleString()});
	    	this.setState({ visited })
	    })
	    await GET(DRAFF).then((res)=>{
	    	let farm = [];
	    	let factory = [];
	    	let store = [];
	    	res.map((e)=>{e.apartment===2?farm.push(e):(e.apartment===3?factory.push(e):store.push(e));return true})
	    	this.setState({ farm, factory, store });
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
					      <a href="#123" target="_blank">Farm</a>
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
							      <img src={Farmbg} className="img-fluid" alt="" />
							      <MDBDataTable striped hover data={visited} />
							    </div>
						    </div>        
				  		</div>				
					  	<DeployNotification visited={this.state.visited.length} farm={this.state.farm.length} factory={this.state.factory.length} store={this.state.store.length}/>
					</div>
				</div>
		    </main>
	    );
  	}
}

export default FarmDashboard;
