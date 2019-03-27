import React, { Component } from 'react';
import {MDBContainer, MDBInput, MDBIcon, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem} from 'mdbreact';
import {POST} from './sys/AppResource';
import swal from 'sweetalert';
import Web3 from 'web3';

class Register extends Component {

	componentWillMount(){
		this.loadBlockchainData()
	}

  	constructor(props){
	    super(props)
	    this.state = {
	      apartmentId:0,
	      apartmentName:'Choise Apartment'
	    }
  	}

  	apartmentClick(apartmentId,apartmentName){
  		this.setState({apartmentId,apartmentName});
  	}

  	async loadBlockchainData(){
	    const web3 = new Web3(Web3.givenProvider || "http://localhost:7545")
	    await web3.eth.getCoinbase((eror,id)=>{
	    	this.setState({id})
	    })
	}

  	addApartment(e){
  		e.preventDefault();
  		let id = this.state.id;
  		if(!id){
  			swal("Please connect to Metamask.","Our blockchain tech using that extension!",'error').then(()=>{window.location.reload()}); 
  		}
  		let name=this.refs.actor.state.innerValue;
  		let apartment=this.state.apartmentId;
  		let secret=this.refs.secret.state.innerValue;
  		let action = apartment === 2?'farm/':(apartment === 3?'factory':'store');
  		POST(action,{name,id,secret,apartment}).then(()=>{
  			swal('Register finish!','Thank for registed','success').then(()=>{window.location.reload()});  			
  		})
  	}

  	render() {
	    return (
	      	<MDBContainer id="main-content">
				<form action="" onSubmit={(e)=>{this.addApartment(e)}}>
		      	<section className="view intro-2">
	                <div className="mask rgba-teal-strong h-100 d-flex justify-content-center align-items-center">
	                  <div className="container">
	                      <div className="row">
	                          <div className="col-xl-5 col-lg-6 col-md-10 col-sm-12 mx-auto mt-5">
	                              <div className="card wow fadeIn" data-wow-delay="0.3s">
	                                  <div className="card-body">
	                                      	<div className="form-header dusty-grass-gradient">
	                                          	<h3><i className="fas fa-user mt-2 mb-2"></i>Register</h3>
	                                      	</div>
	                                      	<MDBInput label="Your name" ref='actor' icon="user" />
	                                      	<MDBDropdown><MDBIcon icon="network-wired" style={{fontSize: "1.75rem"}}/> 
										      	<MDBDropdownToggle caret color="dusty-grass">
											        { this.state.apartmentName }
										      	</MDBDropdownToggle>
										      	<MDBDropdownMenu basic>
											        <MDBDropdownItem onClick={this.apartmentClick.bind(this,2,'Farm')}>Farm</MDBDropdownItem>
											        <MDBDropdownItem onClick={this.apartmentClick.bind(this,3,'Factory')}>Factory</MDBDropdownItem>
											        <MDBDropdownItem onClick={this.apartmentClick.bind(this,4,'Store')}>Store</MDBDropdownItem>
										      	</MDBDropdownMenu>
										    </MDBDropdown>
                                          	<MDBInput label="Your secret" ref='secret' icon="lock" type="password"/>
	                                      	<div className="text-center">
	                                          	<button type="submit" className="btn dusty-grass-gradient btn-lg waves-effect waves-light btn-login">Sign up</button>
	                                          	<hr />
	                                          	<div className="inline-ul text-center d-flex justify-content-center">
		                                              <a className="p-2 m-2 fa-lg tw-ic" href="#123"><i className="fab fa-twitter white-text"></i></a>
		                                              <a className="p-2 m-2 fa-lg li-ic" href="#123"><i className="fab fa-linkedin-in white-text"> </i></a>
		                                              <a className="p-2 m-2 fa-lg ins-ic" href="#123"><i className="fab fa-instagram white-text"> </i></a>
	                                          	</div>
	                                      	</div>
	                                  </div>
	                              </div>
	                          </div>
	                      </div>
	                  </div>
	                </div>
              	</section>
              	</form>
	      	</MDBContainer>
	    );
  	}
}

export default Register;
