import React, { Component } from 'react';
import Web3 from 'web3';
import {APP_LIST_ABI,APP_LIST_ADDRESS} from '../sys/DalatMilk';
import htmlRender from 'react-render-html';
import { LOGGED,FARM,FACTORY,STORE,GET } from '../sys/AppResource';
import { MDBTable,MDBTableHead,MDBTableBody,MDBBtn,MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';

class FarmNotification extends Component {


	componentWillMount(){
		this.loadBlockchainData()
  	}

	constructor(props){
	    super(props)
	    this.state = {
	       apartment:'unknow apartment',
	       modal:false,
	       visited:0,
	       farmSelect:'',
	       factorySelect:'',
	       storeSelect:'',
	       selection:'',
	       info:''
	    }
  	}

  	async loadBlockchainData(){
	    const web3 = new Web3(Web3.givenProvider || "http://localhost:7545")
	    const dalatMilk = new web3.eth.Contract(APP_LIST_ABI,APP_LIST_ADDRESS )
	    this.setState({ dalatMilk })
	    await web3.eth.getCoinbase((eror,account)=>{
	    	this.setState({ account })
	    })
	    await GET(LOGGED).then((res)=>{
	    	let visited = res.length;
	    	this.setState({ visited })
	    })
	    await GET(FARM).then((res)=>{
	    	let farm = res.length;
	    	let farmSelect = '<option hidden={true}>Choose your farm</option>'
	        res.forEach(e=>{
	        	farmSelect += '<option value="'+e.id+'">'+e.id+'</option>'
	        })
	    	this.setState({ farm,farmSelect })
	    })
	    await GET(FACTORY).then((res)=>{
	    	let factory = res.length;
	    	let factorySelect = '<option hidden={true}>Choose your factory</option>'
	        res.forEach(e=>{
	        	factorySelect += '<option value="'+e.id+'">'+e.id+'</option>'
	        })
	    	this.setState({ factory,factorySelect })
	    })
	    await GET(STORE).then((res)=>{
	    	let store = res.length;
	    	let storeSelect = '<option hidden={true}>Choose your store</option>'
	        res.forEach(e=>{
	        	storeSelect += '<option value="'+e.id+'">'+e.id+'</option>'
	        })
	    	this.setState({ store,storeSelect })
	    })
  	}

  	toggle(){
	  	this.setState({
	    	modal: !this.state.modal
	  	});
	}

	getList(_apartment){
		let info = ''
		let apartment = '', selection = ''
		if(_apartment === 'farm'){
			apartment = 'Farm list'
			selection = this.state.farmSelect
			
		}else if(_apartment === 'factory'){
			apartment = 'Factory list'
			selection = this.state.factorySelect
		}else if(_apartment === 'store'){
			apartment = 'Store list'			
			selection = this.state.storeSelect
		}
		this.setState({info,apartment,selection});
		this.toggle(2)
	}

	getInfo(){
		let info = ''
		this.state.dalatMilk.methods.getProfile(this.refs.info.value).call({from:this.state.account}).then((res)=>{
			let registed = new Date(parseInt(res[3])*1e3).toLocaleString();
			info = <MDBTable bordered hover>
		      <MDBTableHead color="primary-color" textWhite>
		        <tr>
		          <th width="30%">Option</th>
		          <th width="70%">Infomation</th>
		        </tr>
		      </MDBTableHead>
		      <MDBTableBody>
		        <tr>
		          <td>Name</td>
		          <td>{res[0]}</td>
		        </tr>
		        <tr>
		          <td>Location</td>
		          <td>{res[1]}</td>
		        </tr>
		        <tr>
		          <td>Created at</td>
		          <td>{registed}</td>
		        </tr>
		      </MDBTableBody>
		    </MDBTable>
	    	this.setState({info})
		})
	}

  	render() {
	    return (
		  	<div className="col-md-3 mb-4">
			    <div className="card mb-4">
			      <div className="card-body">
			        <div className="list-group list-group-flush">
			          <a className="list-group-item list-group-item-action waves-effect" href="/farm">Visited
			            <span className="badge badge-primary badge-pill float-right ml-2">{this.state.visited}
			            </span>
			          </a>			          
			          <a className="list-group-item list-group-item-action waves-effect" href="#farm" onClick={this.getList.bind(this,'farm')}>Farm 
			            <span className="badge badge-success badge-pill float-right ml-2" title="Farm accounts">{this.state.farm}
			            </span>
			          </a>
			          <a className="list-group-item list-group-item-action waves-effect" href="#farm" onClick={this.getList.bind(this,'factory')}>Factory
			            <span className="badge badge-warning badge-pill float-right ml-2">{this.state.factory}</span>
			          </a>
			          <a className="list-group-item list-group-item-action waves-effect" href="#farm" onClick={this.getList.bind(this,'store')}>Store
			            <span className="badge badge-danger badge-pill float-right ml-2">{this.state.store}</span>
			          </a>
			        </div>
			      </div>
			    </div>			    
		        <MDBModal isOpen={ this.state.modal } toggle={this.toggle.bind(this,2)} >
			        <MDBModalHeader toggle={this.toggle.bind(this,2)} >{this.state.apartment}</MDBModalHeader>
			        <MDBModalBody>
			        	<select className="browser-default custom-select" ref='info' onChange={this.getInfo.bind(this)}>
			        	{ htmlRender(this.state.selection) }	
			        	</select>
			        	<hr/>
			        	{ this.state.info || <MDBTable bordered hover>
					      <MDBTableHead color="primary-color" textWhite>
					        <tr>
					          <th width="30%">Option</th>
					          <th width="70%">Infomation</th>
					        </tr>
					      </MDBTableHead>
					      <MDBTableBody>
					        <tr>
					          <td>Name</td>
					          <td>Please choose item on selection</td>
					        </tr>
					        <tr>
					          <td>Location</td>
					          <td>Please choose item on selection</td>
					        </tr>
					        <tr>
					          <td>Created at</td>
					          <td>Please choose item on selection</td>
					        </tr>
					      </MDBTableBody>
					    </MDBTable>}	        	 	
			        </MDBModalBody>
			        <MDBModalFooter>
			          <MDBBtn color="secondary" onClick={this.toggle.bind(this,2)}>Close</MDBBtn>
			        </MDBModalFooter>
		      	</MDBModal>
		  	</div>
	    );
  	}
}

export default FarmNotification;
