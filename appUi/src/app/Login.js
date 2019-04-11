import React, { Component } from 'react';
import {MDBContainer, MDBInput} from 'mdbreact';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import Web3 from 'web3';
import {APP_LIST_ABI,APP_LIST_ADDRESS} from './sys/DalatMilk';
import {LOGGED,POST,HOUREXP,HEADERS,SECRET_KEY,expiresIn} from './sys/AppResource';
import swal from 'sweetalert';
import jwt from 'jsonwebtoken';
import './css/login.css';

class Login extends Component {

	static propTypes = {
	    cookies: instanceOf(Cookies).isRequired
  	};

	componentWillMount(){
		this.loadBlockchainData();
  	}

	constructor(props){
	    super(props)
	    const { cookies } = props;
	    this.state = {
	      isSecret:false,
	      counter:1,
	      actor:cookies.get('actor')||0
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

  	checkSecret(){
  		const {cookies} = this.props;
  		let _key = this.refs.secret.state.innerValue;
  		let token = this.createToken({appKey:APP_LIST_ADDRESS})
  		let userToken = this.createToken({appKey:APP_LIST_ADDRESS})
  		let authorization = 'milkApp '+token
		let loggedHeader = {...HEADERS,authorization}
  		if(parseInt(this.state.actor) === 1){
	  		if(!this.state.isSecret){
		  		this.state.dalatMilk.methods.updateSecret(_key).send({from:this.state.account}).once('receipt', (rec)=>{
			      	this.setState({isSecret:true})
			      	cookies.set('logged', token, { maxAge:18*1e3,path: '/' });
			      	cookies.set('userToken', userToken, { maxAge:18*1e3,path: '/' });
					POST(LOGGED, {id: this.state.account,exp: HOUREXP}, loggedHeader)
				        .then(()=>{
				        	cookies.set('isLogged', true, { maxAge:36*1e2, path: '/' });
				        	swal('Sign In finish','Thanks!','success').then(()=>{
				        		window.location.reload();
				        	});
				        });
	    			})
	  		}else{
	  			this.state.dalatMilk.methods.checkSecret(_key).call({from:this.state.account}).then((isLogged)=>{
	  				this.setState({isLogged});
	  				cookies.set('logged', token, { maxAge:18*1e3,path: '/' });
			      	cookies.set('userToken', userToken, { maxAge:18*1e3,path: '/' });
	  				if(isLogged){
		  				POST(LOGGED, {id: this.state.account,exp: HOUREXP}, loggedHeader)
				        .then(()=>{
				        	cookies.set('isLogged', true, { maxAge:36*1e2,path: '/' });
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
  		} else {
  			this.state.dalatMilk.methods.checkLogin(_key).call({from:this.state.account}).then((isLogged)=>{
  				this.setState({isLogged});  
  				cookies.set('logged', token, { maxAge:18*1e3,path: '/' });		
		      	cookies.set('userToken', userToken, { maxAge:18*1e3,path: '/' });		
  				if(isLogged){
	  				POST(LOGGED, {id: this.state.account,exp: HOUREXP}, loggedHeader)
			        .then(()=>{
			        	cookies.set('isLogged', true, { maxAge:36*1e3,path: '/' });
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

  	createToken(payload){
	  	return jwt.sign(payload, SECRET_KEY, {expiresIn})
	}

  	render() {
	    return (
	      	<MDBContainer id="main-content">
	      		<form action="" onSubmit={(e)=>{e.preventDefault();this.checkSecret()}}>
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

export default withCookies(Login);
