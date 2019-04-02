import React, { Component } from 'react';
import Farmbg from '../img/Farm-processing.jpg';
import Web3 from 'web3';
import { LOGGED,GET } from '../sys/AppResource';
import FarmNotification from './FarmNotification';
import { MDBDataTable, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';

class FarmMilk extends Component {

	componentWillMount(){
		this.loadBlockchainData()
  	}

	constructor(props){
	    super(props)
	    this.state = {
	      	modal:false
	    }
  	}

  	async loadBlockchainData(){
	    const web3 = new Web3(Web3.givenProvider || "http://localhost:7545")
	    // const dalatMilk = new web3.eth.Contract(APP_LIST_ABI,APP_LIST_ADDRESS )
	    await web3.eth.getCoinbase((eror,account)=>{
	    	this.setState({ account })
	    })
	    await GET(LOGGED).then((visited)=>{
	    	visited.map((v)=>{v.time = new Date((v.exp/1e3)-7200).toLocaleString(); delete v.exp; return true;});
	    	this.setState({ visited })
	    })
  	}

  	toggle(){
	  	this.setState({
	    	modal: !this.state.modal
	  	});
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
					      <span>Milk list</span>
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
						      	<div className="card-header">
						      		Milk list
						      		<span className="float-right mr-2"><a href="#!" onClick={this.toggle.bind(this,2)} className="text-success"><i className="fa fa-plus fa-2x" aria-hidden="true"></i></a></span>
						      	</div>
						      	<div className="card-body customer-style">
							      <img src={Farmbg} className="img-fluid" alt="" />
							      <MDBDataTable striped hover data={visited} />
							    </div>
						    </div>        
				  		</div>				
					  	<FarmNotification/>
					</div>
				</div>
				<MDBModal isOpen={ this.state.modal } toggle={this.toggle.bind(this,2)} >
			        <MDBModalHeader toggle={this.toggle.bind(this,2)} >New Milk infomation</MDBModalHeader>
			        <MDBModalBody>
			        	Milk info	        	 	
			        </MDBModalBody>
			        <MDBModalFooter>
			          <MDBBtn color="secondary" onClick={this.toggle.bind(this,2)}>Close</MDBBtn>
			        </MDBModalFooter>
		      	</MDBModal>
		    </main>
	    );
  	}
}

export default FarmMilk;
