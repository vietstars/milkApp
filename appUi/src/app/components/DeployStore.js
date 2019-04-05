import React, { Component } from 'react';
import {APP_LIST_ABI,APP_LIST_ADDRESS} from '../sys/DalatMilk';
import Web3 from 'web3';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import { LOGGED,DRAFF,FARM,FACTORY,STORE,GET,POST,DEL,HEADERS } from '../sys/AppResource';
import swal from 'sweetalert';
import DeployNotification from './DeployNotification';
import { MDBDataTable, MDBInput, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';

class DeployStore extends Component {

	static propTypes = {
	    cookies: instanceOf(Cookies).isRequired
  	};

	componentWillMount(){
		this.loadBlockchainData()
  	}

	constructor(props){
	    super(props)
	    const { cookies } = props
	    let token = cookies.get('logged')
	    let userToken = cookies.get('userToken')
	    let authorization = 'milkApp '+token
	    let loggedHeader = {...HEADERS,authorization}
	    authorization = 'milkApp '+userToken
	    let userHeader = {...HEADERS,authorization}
	    this.state = {
	      	visited: 0,
	      	farm: [],
	      	factory: [],
	      	store: [],
	      	chkbox:true,
	      	modal:false,
	      	infomation:'Infomation are available now!',
	      	token:'0x0',
	      	farmCount:0,
			factoryCount:0,
			storeCount:0,
			loggedHeader:loggedHeader,
			userHeader:userHeader
	    }
  	}

	async loadBlockchainData(){
	    const web3 = new Web3(Web3.givenProvider || "http://localhost:7545")
	    const dalatMilk = new web3.eth.Contract(APP_LIST_ABI,APP_LIST_ADDRESS )
	    this.setState({ dalatMilk })
	    await web3.eth.getCoinbase((eror,account)=>{
	    	this.setState({ account })
	    })
	    await GET(LOGGED,this.state.loggedHeader).then((res)=>{
	    	this.setState({ visited:res.length })
	    })
     	await GET(DRAFF,this.state.loggedHeader).then((res)=>{
	    	let farm = [],factory = [],list = [];
	    	res.map((e)=>{
	    		e.apartment===2?farm.push(e):(e.apartment===3?factory.push(e):list.push(e));
	    		return true
	    	})
	    	this.setState({ farm, factory, list });
	    })
	    let store=[]
	    this.state.list.map((v)=>{let a = {}; a.checkbox=<MDBInput label=" "  type="checkbox" value={v.id}/>;a.store=v.name;a.token=v.id;a.act=<MDBBtn color="warning" size="sm" rounded onClick={this.getInfomation.bind(this,v.id)}>Infomation</MDBBtn>;store.push(a); return true});	
	    this.setState({ store })
	    await GET(FARM,this.state.userHeader).then((res)=>{
	    	let farmCount = res.length
	    	this.setState({ farmCount })
	    })
	    await GET(FACTORY,this.state.userHeader).then((res)=>{
	    	let factoryCount = res.length
	    	this.setState({ factoryCount })
	    })
	    await GET(STORE,this.state.userHeader).then((res)=>{
	    	let storeCount = res.length
	    	this.setState({ storeCount })
	    })
  	}

  	toggle(){
	  	this.setState({
	    	modal: !this.state.modal
	  	});
	}

  	getInfomation(_id){
  		this.state.store.map((v)=>{
  			if(v.token===_id){
				this.setState({
			    	infomation: v.store,
					token:_id
			  	})
	  			return true
	  		}
	  		return true
  		})
	  	this.toggle(2)
	}

	activeStore(){
		let actor = []
		this.state.list.map((v) =>{ if(v.id===this.state.token)actor= v; return true;})
		let _draff = DRAFF+this.state.token
		this.state.dalatMilk.methods.updateProfile(actor.id,actor.name,'actor address location',4,actor.secret).send({from:this.state.account}).once('receipt',(rec)=>{
			POST(STORE,{id:actor.id},this.state.userHeader).then(()=>{
				DEL(_draff,this.state.loggedHeader).then(()=>{
					swal('Active finish','Thanks!','success').then(()=>{window.location.reload()})
				})
			})
		})
	}

  	render() {
  		const _empty=[{checkbox:'','store':'','token':'Factories are not availbility now!','act':''}];
  		const store = {
	    	columns: [
	    	  {
		        label: <MDBInput label=" " defaultChecked={this.state.chkbox} type="checkbox" className="CheckAll" />,
		        field: 'checkbox',
		        width: 65
		      },
		      {
		        label: <label>Name</label>,
		        field: 'store',
		        sort: 'asc',
		        width: 150
		      },
		      {
		        label: <label className="disable-icon">Token</label>,
		        field: 'token',
		        width: 400
		      },
		      {
		        label: <label className="disable-icon">Information</label>,
		        field: 'act',
		        width: 65
		      }],
		    rows: this.state.store.length>0?this.state.store:_empty
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
						      	<div className="card-header">Store pending</div>
						      	<div className="card-body">
						    		<MDBDataTable responsive striped hover bordered small data={store} />
						    	</div>
						    </div>        
				  	  	</div>
				  		<DeployNotification visited={this.state.visited} farm={this.state.farm.length} factory={this.state.factory.length} store={this.state.store.length} farmCount={this.state.farmCount} factoryCount={this.state.factoryCount} storeCount={this.state.storeCount} />
				  	</div>
				</div>
				<MDBModal isOpen={ this.state.modal } toggle={this.toggle.bind(this,2)} >
			        <MDBModalHeader toggle={this.toggle.bind(this,2)} >Store infomaption</MDBModalHeader>
			        <MDBModalBody>
			          {this.state.infomation}
			        </MDBModalBody>
			        <MDBModalFooter>
			          <MDBBtn color="secondary" onClick={this.toggle.bind(this,2)}>Close</MDBBtn>
			          <MDBBtn color="primary" onClick={this.activeStore.bind(this)}>Active</MDBBtn>
			        </MDBModalFooter>
		      	</MDBModal>
		    </main>
	    );
  	}
}

export default withCookies(DeployStore);
