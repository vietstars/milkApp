import React, { Component } from 'react';
import Farmbg from '../img/Farm-processing.jpg';
import Web3 from 'web3';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import { FARM,GET,PATCH,HEADERS } from '../sys/AppResource';
import FarmNotification from './FarmNotification';
import swal from 'sweetalert';
import { FARM_LIST_ABI,FARM_LIST_ADDRESS } from '../sys/DalatMilk';
import { MDBDataTable, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBInput, MDBIcon } from 'mdbreact';

class FarmCategory extends Component {

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
	    	let category = res.category
	    	let tableShow = []
	    	res.category.forEach((v)=>{
	    		let n = {}
	    		farm.methods.getCategory(this.state.account,v.id).call({from:self.state.account}).then((res)=>{
		    		n.name = <strong>{res[3]}<br/><small>{v.description}</small></strong>;
		    		n.income = <strong>{res[4]}<br/><small className="red-text">{v.income} lt</small></strong>;
		    		n.price = <strong>{res[0]} <small>lt</small><br/><small className="red-text">{v.price} eth</small></strong>;
		    		n.createAt = new Date(v.id*1e3).toLocaleString().slice(0,-6).replace(':','h');
		    		n.act = <MDBBtn color="info" size="sm" rounded><MDBIcon far icon="edit" /></MDBBtn>;
	    		})
	    		tableShow=[...tableShow,n]
	    	})
	    	this.setState({ category,tableShow })
	    })
  	}

  	toggle(){
	  	this.setState({
	    	modal: !this.state.modal
	  	});
	}

  	addMilkCategory(e){
  		e.preventDefault()
  		const prName = this.refs.productName.state.innerValue;
  		const cowsKind = this.refs.cowsKind.state.innerValue;
  		const income = this.refs.income.state.innerValue;
  		const price = this.refs.price.state.innerValue;
  		const description = this.refs.description.state.innerValue;
  		if(prName === '')
  			swal('Please enter your product name','Thanks!','error')
  		else if(cowsKind === '')
  			swal('Please enter kind of cows','Thanks!','error')
  			else if(income ==='')
  				swal('Please enter your income per day','Thanks!','error')
	  			else if(price ==='')
	  				swal('Please enter your price per litter','Thanks!','error')
	  				else if(description ==='')
	  					swal('Please enter your description','Thanks!','error')
		else{
			this.state.farm.events.getCategoryId({},(err, res) => { 
				let id=res.returnValues.categoryId;
				let category = [...this.state.category,{ id,prName,cowsKind,income,price,description }]
				PATCH(FARM+this.state.account,{category},this.state.userHeader).then((res)=>{
	  				swal('Add product category finish','Thanks!','success').then(()=>{
	  					window.location.reload()
	  				})
				})
			})
			this.state.farm.methods.addCategory(prName,cowsKind,income,price).send({from:this.state.account})
		}
	}

  	render() {
	  	const category = {
	    	columns: [
		      {
		        label: <label>Product/<small>Description</small></label>,
		        field: 'name',
		        sort: 'asc',
		        width: '50'
		      },
		      {
		        label: <h6 className="disable-icon">Cows/<small>Income</small></h6>,
		        field: 'income',
		        width: '10'
		      },
		      {
		        label: <h6 className="disable-icon">Sold/<small>Price</small></h6>,
		        field: 'price',
		        width: '10'
		      },
		      {
		        label: <h6 className="disable-icon text-right">Create at</h6>,
		        field: 'createAt',
		        width: '10'
		      },
		      {
		        label: <h6 className="disable-icon">Action</h6>,
		        field: 'act',
		        width: '10'
		      }],
		    rows: this.state.tableShow
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
							      <MDBDataTable striped hover data={category} />
							    </div>
						    </div>        
				  		</div>				
					  	<FarmNotification/>
					</div>
				</div>
				<MDBModal isOpen={ this.state.modal } toggle={this.toggle.bind(this,2)} >
				  <form onSubmit={this.addMilkCategory.bind(this)}>
			        <MDBModalHeader toggle={this.toggle.bind(this,2)} >New category <small> <small><br />Your category which you show your products to factory.</small></small></MDBModalHeader>
			        <MDBModalBody>
			        	<MDBInput label="Product name" ref="productName" outline className="black-text" /> 
			        	<small className="red-text">Your product name is inmutable on blockchain(then you will cost fee for save it)</small>
			        	<MDBInput label="Kind of cows" ref="cowsKind" outline className="black-text" /> 
			        	<small className="red-text">Your kind of cow is inmutable on blockchain</small>
			        	<MDBInput label="Income per day" ref="income" type="number" placeholder="0" outline className="black-text" />    
			        	<MDBInput label="price per litter" ref="price" type="number" placeholder="0" outline className="black-text" /> 
			        	<small className="red-text">Please enter your price using ether price(which the factory will pay)</small>
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

export default withCookies(FarmCategory);
