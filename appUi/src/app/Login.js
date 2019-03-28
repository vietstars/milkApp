import React, { Component } from 'react';
import {MDBContainer, MDBInput} from 'mdbreact';
import Web3 from 'web3';
import {APP_LIST_ABI,APP_LIST_ADDRESS} from './sys/DalatMilk';
import {HOURSEXP,POST} from './sys/AppResource';
import swal from 'sweetalert';
import './css/login.css';

class Login extends Component {

	componentWillMount(){
		this.loadBlockchainData();
  	}

	constructor(props){
	    super(props)
	    this.state = {
	      isLogged: false,
	      isSecret:false,
	      counter:1
	    }
  	}

  	async loadBlockchainData(){
	    const web3 = new Web3(Web3.givenProvider || "http://localhost:7545")
	    const dalatMilk = new web3.eth.Contract(APP_LIST_ABI,APP_LIST_ADDRESS )
	    this.setState({dalatMilk});
	    await web3.eth.getCoinbase((eror,account)=>{
	    	this.setState({ account })
	    })
	    await dalatMilk.methods.secretDeploy().call({from:this.state.account}).then((isSecret)=>{
	    		this.setState({ isSecret })
	    })
  	}

  	addSecret(){
  		let _key = this.refs.secret.state.innerValue;
  		if(!this.state.isSecret){
	  		this.state.dalatMilk.methods.updateSecret(_key).send({from:this.state.account}).once('receipt', (rec)=>{
		      	this.setState({isSecret:true})
				POST("logged/", {id: this.state.account,exp: HOURSEXP})
			        .then(()=>{
			        	swal('Sign In finish','Thanks!','success').then(()=>{
			        		window.location.reload();
			        	});
			        });
    			})
  		}else{
  			this.state.dalatMilk.methods.checkSecret(_key).call({from:this.state.account}).then((isLogged)=>{
  				this.setState({isLogged});
  				if(isLogged){
	  				POST("logged/", {id: this.state.account,exp: HOURSEXP})
			        .then(()=>{
			        	swal('Sign In finish','Thanks!','success').then(()=>{
			        		window.location.reload();
			        	});
			        });
  				}else{
  					swal('Some thing wrong!',this.state.counter<=3?'Counter checked: '+ this.state.counter:'Please enter your correct secret key','error').then(()=>{
			        	if(this.state.counter > 3){
			        		window.location.href = '/'
			        	}else{
			        		this.setState({ counter:this.state.counter+1})
			        	}
			        });
  				}
		    })
  		}
  	}

  	render() {
	    return (
	      	<MDBContainer id="main-content">
	      		<form action="" onSubmit={(e)=>{e.preventDefault();this.addSecret()}}>
		      	<section className="view intro-2">
	                <div className="mask rgba-stylish-strong h-100 d-flex justify-content-center align-items-center">
	                  <div className="container">
	                      <div className="row">
	                          <div className="col-xl-5 col-lg-6 col-md-10 col-sm-12 mx-auto mt-5">
	                              <div className="card wow fadeIn" data-wow-delay="0.3s">
	                                  <div className="card-body">
	                                      <div className="form-header purple-gradient">
	                                          <h3><i className="fas fa-user mt-2 mb-2"></i> Login</h3>
	                                      </div>
	                                      <h5 className="text-center">{!this.state.isSecret?"Please secret your account!":""}</h5>
	                                      <div className="md-form">
	                                          <MDBInput label="Your password" ref='secret' icon="lock" type="password"/>
	                                      </div>
	                                      <div className="text-center">
	                                          <button type="submit" className="btn purple-gradient btn-lg waves-effect waves-light btn-login">Sign up</button>
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

export default Login;
