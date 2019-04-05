import React, { Component } from 'react';
import Farmbg from '../img/Farm-processing.jpg';
import Web3 from 'web3';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import { LOGGED,GET,HEADERS } from '../sys/AppResource';
import FarmNotification from './FarmNotification';
import swal from 'sweetalert';
import { MDBDataTable, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBInput } from 'mdbreact';

class FarmCategory extends Component {

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
	      	modal:false,
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

  	toggle(){
	  	this.setState({
	    	modal: !this.state.modal
	  	});
	}

  	addMilkInfo(e){
  		e.preventDefault()
  		const prName = this.refs.productName.state.innerValue;
  		const cowsKind = this.refs.cowsKind.state.innerValue;
  		const quantity = this.refs.quantity.state.innerValue;
  		const description = this.refs.desrciption.state.innerValue;
  		if(prName === '')
  			swal('Please enter your product name','Thanks!','error')
  		else if(cowsKind === '')
  			swal('Please enter kind of cows','Thanks!','error')
  			else if(quantity ==='')
  				swal('Please enter your quantity per day','Thanks!','error')
  				else if(description ==='')
  					swal('Please enter your descriptions','Thanks!','error')
	  	swal('Add product info finish','Thanks!','success')
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
					      <span>Milk category</span>
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
						      		Category
						      		<span className="float-right mr-2 text-success" style={{cursor:'pointer'}} onClick={this.toggle.bind(this,2)}><i className="fa fa-plus fa-2x" aria-hidden="true"></i></span>
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
				  <form onSubmit={this.addMilkInfo.bind(this)}>
			        <MDBModalHeader toggle={this.toggle.bind(this,2)} >Category infomation <small> <small><br />Your category which you show your products to factory.</small></small></MDBModalHeader>
			        <MDBModalBody>
			        	<MDBInput label="Milk name" ref="productName" outline className="black-text" /> 
			        	<small className="red-text">Your infomation inmutable on blockchain(then you will cost fee for save it)</small>
			        	<MDBInput label="Kind of cows" ref="cowsKind"  outline className="black-text" /> 
			        	<small className="red-text">Your infomation inmutable on blockchain</small>
			        	<MDBInput label="Quantity per day" ref="quantity" type="number" placeholder="0" outline className="black-text" />    
			        	<MDBInput type="textarea" ref="desrciption" label="Description" outline className="black-text" />  	 	
			        </MDBModalBody>
			        <MDBModalFooter>
			          <MDBBtn color="secondary" onClick={this.toggle.bind(this,2)}>Close</MDBBtn>
			          <MDBBtn color="primary" type="submit">Submit</MDBBtn>
			        </MDBModalFooter>
			      </form>
		      	</MDBModal>
		    </main>
	    );
  	}
}

export default withCookies(FarmCategory);
