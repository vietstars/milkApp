import React, { Component } from 'react';
import Web3 from 'web3';
import { GET } from '../sys/AppResource';
import DeployNotification from './DeployNotification';
import { MDBDataTable, MDBInput, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';

class DeployFactory extends Component {

	componentWillMount(){
		this.loadBlockchainData()
  	}

	constructor(props){
	    super(props)
	    this.state = {
	      	visited: 0,
	      	farm: 0,
	      	factory: [],
	      	store: 0,
	      	chkbox:true,
	      	modal:false,
	      	infomation:'Infomation is available now!',
	      	token:'0x0'
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
	    await GET('factory/').then((list)=>{
	    	let factory = [];
	    	list.map((v)=>{let a = {}; a.checkbox=<MDBInput label=" "  type="checkbox" value={v.id}/>;a.factory=v.name;a.token=v.id;a.act=<MDBBtn color="warning" size="sm" rounded onClick={this.getInfomation.bind(this,v.id)}>Infomation</MDBBtn>;factory.push(a); return true});
	    	this.setState({ factory,list })
	    })
	    await GET('store/').then((res)=>{
	    	this.setState({ store:res.length })
	    })
  	}

  	toggle(){
	  	this.setState({
	    	modal: !this.state.modal
	  	});
	}
  	getInfomation(_id){
  		this.state.factory.map((v)=>{
  			if(v.token===_id){
				this.setState({
			    	infomation: v.factory,
					token:_id
			  	})
	  			return true
	  		}
	  		return true
  		})
	  	this.toggle(2)
	}

	activeFactory(){
		alert(this.state.token)
	}

  	render() {
  		const _empty=[{checkbox:'','factory':'','token':'Factories are not availbility now!','act':''}];
  		const factory = {
	    	columns: [
	    	  {
		        label: <MDBInput label=" " defaultChecked={this.state.chkbox} type="checkbox" className="CheckAll" />,
		        field: 'checkbox',
		        width: 65
		      },
		      {
		        label: 'Name',
		        field: 'factory',
		        sort: 'asc',
		        width: 150
		      },
		      {
		        label: 'token',
		        field: 'token',
		        width: 400
		      },
		      {
		        label: <label className="disable-icon">Information</label>,
		        field: 'act',
		        width: 65
		      }],
		    rows: this.state.factory?this.state.factory:_empty
	  	}
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
						      	<div className="card-header">Factory registed</div>
						      	<div className="card-body">
						    		<MDBDataTable responsive striped hover bordered small data={factory} />
						    	</div>
						    </div>        
				  	  	</div>
				  		<DeployNotification visited={this.state.visited} farm={this.state.farm} factory={this.state.factory.length} store={this.state.store}/>
				  	</div>
				</div>
				<MDBModal isOpen={ this.state.modal } toggle={this.toggle.bind(this,2)} >
			        <MDBModalHeader toggle={this.toggle.bind(this,2)} >Factory infomaption</MDBModalHeader>
			        <MDBModalBody>
			          {this.state.infomation}
			        </MDBModalBody>
			        <MDBModalFooter>
			          <MDBBtn color="secondary" onClick={this.toggle.bind(this,2)}>Close</MDBBtn>
			          <MDBBtn color="primary" onClick={this.activeFactory.bind(this)}>Active</MDBBtn>
			        </MDBModalFooter>
		      	</MDBModal>
		    </main>
	    );
  	}
}
export default DeployFactory;
