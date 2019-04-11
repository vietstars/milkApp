import React, { Component } from 'react';
import Farmbg from '../img/Farm-processing.jpg';
import Web3 from 'web3';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import { FARM,GET,PATCH,HEADERS } from '../sys/AppResource';
import FarmNotification from './FarmNotification';
import htmlRender from 'react-render-html';
import swal from 'sweetalert';
import { FARM_LIST_ABI,FARM_LIST_ADDRESS } from '../sys/DalatMilk';
import { MDBDataTable, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBInput, MDBIcon } from 'mdbreact';

class FarmMilk extends Component {

	static propTypes = {
	    cookies: instanceOf(Cookies).isRequired
  	};

	componentWillMount(){
		this.loadBlockchainData()
  	}

	constructor(props){
	    super(props)
	    const { cookies } = props;let token = cookies.get('logged')
	    let userToken = cookies.get('userToken')
	    let authorization = 'milkApp '+token
	    let loggedHeader = {...HEADERS,authorization}
	    authorization = 'milkApp '+userToken
	    let userHeader = {...HEADERS,authorization}
	    this.state = {
	      	modal:false,
			loggedHeader:loggedHeader,
			userHeader:userHeader
	    }
  	}

  	async loadBlockchainData(){
  		const self = this
	    const web3 = new Web3(Web3.givenProvider || "http://localhost:7545")
	    const farm = new web3.eth.Contract(FARM_LIST_ABI,FARM_LIST_ADDRESS )
	    this.setState({ farm })
	    await web3.eth.getCoinbase((eror,account)=>{
	    	this.setState({ account })
	    })
	    await GET(FARM+this.state.account,this.state.userHeader).then((res)=>{
	    	let milk = res.milk
	    	let category = res.category
	    	let tableShow = []
	    	res.milk.forEach((v)=>{
	    		let n = {}
	    		farm.methods.getCategory(this.state.account,v.category).call({from:self.state.account}).then((res)=>{
	    			console.log(res);
		    		n.name = <strong>{v.name}<br/><small>{v.description}</small></strong>;
		    		n.category = <strong>{res[3]}<br/><small className="red-text">{v.quantity}</small></strong>;
		    		n.quantity = <strong>{v.quantity}<small>lt</small><br/><small className="red-text">sold</small></strong>;
		    		n.incomeAt = new Date(v.id*1e3).toLocaleString().slice(0,-6).replace(':','h');
		    		n.act = <MDBBtn color="info" size="sm" rounded><MDBIcon icon="dolly-flatbed" /></MDBBtn>;
	    		})
	    		tableShow=[...tableShow,n]
	    	})
	    	this.setState({ milk,category,tableShow })
	    })
  	}

  	toggle(){
	  	this.setState({
	    	modal: !this.state.modal
	  	});
	}

  	addMilkInfo(e){
  		e.preventDefault()
  		const name = this.refs.milkName.state.innerValue;
  		const category = this.refs.milkCategory.value;
  		const quantity = this.refs.quantity.state.innerValue;
  		const description = this.refs.description.state.innerValue;
  		if(name === '')
  			swal('Please enter your product name','Thanks!','error')
  		else if(category === '')
  			swal('Please choose category','Thanks!','error')
  			else if(quantity ==='')
  				swal('Please enter milk quantity','Thanks!','error')
  				else if(description ==='')
  					swal('Please enter your descriptions','Thanks!','error')
		else{
			this.state.farm.events.getMilkId({},(err, res) => { 
				let id=res.returnValues.milkId;
				let sold = [];
				let milk = [...this.state.milk,{ id,name,category,quantity,description,sold }]
				PATCH(FARM+this.state.account,{milk},this.state.userHeader).then((res)=>{
	  				swal('Add milk finish','Thanks!','success').then(()=>{
	  					window.location.reload()
	  				})
				})
			})
			this.state.farm.methods.addMilkInfo(category,quantity).send({from:this.state.account})
		}
	}

  	render() {
	  	const milkList = {
	    	columns: [
		      {
		        label: <label>Name/<small>Description</small></label>,
		        field: 'name',
		        sort: 'asc',
		        width: '30'
		      },
		      {
		        label: <h6 className="disable-icon">Category/<small>Quantity</small></h6>,
		        field: 'category',
		        width: '30'
		      },
		      {
		        label: <h6 className="disable-icon">Remain/<small>Sold</small></h6>,
		        field: 'quantity',
		        width: '10'
		      },
		      {
		        label: <h6 className="disable-icon text-right">Income at</h6>,
		        field: 'incomeAt',
		        width: '10'
		      },
		      {
		        label: <h6 className="disable-icon text-right">Action</h6>,
		        field: 'act',
		        width: '10'
		      }],
		    rows: this.state.tableShow
	  	}
	  	let option = '<option hidden={true}>Select milk category</option>'
	  	if(this.state.category !== undefined)
		  	this.state.category.forEach((c)=>{
	    		option += '<option value='+c.id+'>'+c.prName+'</option>'
	    	}) 	
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
						      		Milk in stock
						      		<span className="float-right mr-2 text-success" style={{cursor:'pointer'}} onClick={this.toggle.bind(this,2)}><i className="fa fa-plus fa-2x" aria-hidden="true"></i></span>
						      	</div>
						      	<div className="card-body customer-style">
							      <img src={Farmbg} className="img-fluid" alt="" />
							      <MDBDataTable striped hover data={milkList} />
							    </div>
						    </div>        
				  		</div>				
					  	<FarmNotification/>
					</div>
				</div>
				<MDBModal isOpen={ this.state.modal } toggle={this.toggle.bind(this,2)} >
				  <form onSubmit={this.addMilkInfo.bind(this)}>
			        <MDBModalHeader toggle={this.toggle.bind(this,2)} >New product</MDBModalHeader>
			        <MDBModalBody>
			        	<MDBInput label="Milk name" ref="milkName" outline className="black-text" /> 
			        	<select className="browser-default custom-select" ref='milkCategory'>
			        		{ htmlRender(option) }
			        	</select>
			        	<MDBInput label="Quantity" ref="quantity" type="number" placeholder="0" outline className="black-text" />    
			        	<MDBInput type="textarea" ref="description" label="Description" outline className="black-text" />  	 	
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

export default withCookies(FarmMilk);
