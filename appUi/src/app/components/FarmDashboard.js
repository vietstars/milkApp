import React, { Component } from 'react';
import Farmbg from '../img/Farm-processing.jpg';
import Web3 from 'web3';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import { LOGGED,GET,HEADERS } from '../sys/AppResource';
import FarmNotification from './FarmNotification';
import { MDBDataTable } from 'mdbreact';

class FarmDashboard extends Component {

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
	    let authorization = 'milkApp '+token
	    let loggedHeader = {...HEADERS,authorization}
	    this.state = {
	      	visited: 0,
	      	farm: [],
	      	factory: [],
	      	store: [],
			loggedHeader:loggedHeader
	    }
  	}

  	async loadBlockchainData(){
	    const web3 = new Web3(Web3.givenProvider || "http://localhost:7545")
	    // const dalatMilk = new web3.eth.Contract(APP_LIST_ABI,APP_LIST_ADDRESS )
	    await web3.eth.getCoinbase((eror,account)=>{
	    	this.setState({ account })
	    })
	    await GET(LOGGED,this.state.loggedHeader).then((visited)=>{
	    	visited.map((v)=>{v.time = new Date((v.exp/1e3)-7200).toLocaleString(); delete v.exp; return true;});
	    	this.setState({ visited })
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
						      	<div className="card-header">New orders</div>
						      	<div className="card-body customer-style">
							      <img src={Farmbg} className="img-fluid" alt="" />
							      <MDBDataTable striped hover data={visited} />
							    </div>
						    </div>        
				  		</div>				
					  	<FarmNotification/>
					</div>
				</div>
		    </main>
	    );
  	}
}

export default withCookies(FarmDashboard);
