import React, { Component } from 'react';
import {MDBContainer, MDBInput} from 'mdbreact';
import { Redirect } from 'react-router-dom';
import './css/login.css';

class Login extends Component {

	componentWillMount(){
		// this.setState({logged:true})
  	}

	constructor(props){
	    super(props)
	    this.state = {
	      account:'',
	      logged: false
	    }
  	}

  	render() {
  		if (this.state.logged) {
	       return <Redirect to='/'/>;
     	}
	    return (
	      	<MDBContainer id="main-content">
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
	                                      <div className="md-form">
	                                          <MDBInput label="Your password" className="secret" icon="lock" type="password"/>
	                                      </div>
	                                      <div className="text-center">
	                                          <button className="btn purple-gradient btn-lg waves-effect waves-light btn-login">Sign up</button>
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
	      	</MDBContainer>
	    );
  	}
}

export default Login;
