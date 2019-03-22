import React, { Component } from 'react';
import {MDBContainer, MDBInput} from 'mdbreact';
import { Redirect } from 'react-router-dom';
import Web3 from 'web3';
import {APP_LIST_ABI,APP_LIST_ADDRESS} from './sys/DalatMilk';
import swal from 'sweetalert';
import './css/login.css';

class Login extends Component {

	componentWillMount(){
		// this.setState({isLogged:true})
		this.loadBlockchainData();
  	}
  	async loadBlockchainData(){
	    const web3 = new Web3(Web3.givenProvider || "http://localhost:7545")
	    // const network = await web3.eth.net.getNetworkType()
	    // const accounts = await web3.eth.getAccounts()
	    const dalatMilk = new web3.eth.Contract(APP_LIST_ABI,APP_LIST_ADDRESS )
	    this.setState({dalatMilk})
	    await web3.eth.getCoinbase((eror,res)=>{
	    	this.setState({account:res})
	    })
	    await dalatMilk.methods.info(this.state.account).call({from:this.state.account}).then((res)=>{
	    	if(res[2]!=='0x0000000000000000000000000000000000000000000000000000000000000000'){
	    		this.setState({isSecret:true});
	    	}
	    })
	    // this.setState({ taskCount })
	    // for( var i = 1; i <= taskCount; i++ ){
	    //   const task = await todoList.methods.tasks(i).call()
	    //   this.setState({tasks:[...this.state.tasks, task]})
	    // } 
	    // this.setState({ loading:false })
	    // console.log("tasks",this.state.tasks);
  	}
	constructor(props){
	    super(props)
	    this.state = {
	      isSecret:false,
	      isLogged: false,
	    }
  	}

  	checkPass(){
  		let _key = this.refs.secret.state.innerValue;
  		if(!this.state.isSecret){
	  		this.state.dalatMilk.methods.createSecret(_key).send({from:this.state.account}).once('receipt',(rec)=>{
	  			console.log(rec);
	  			this.setState({isSecret:true,isLogged:true})
	  			swal('Thanks!','New password success','success')
	  		})
  		}else{
  			this.state.dalatMilk.methods.checkSecret(_key).call({from:this.state.account}).then((rec)=>{
  				console.log(rec);
	  			this.setState({isSecret:true,isLogged:true})
	  			swal('Thanks!','Login success','success')
	  		})
  		}
  	}

  	render() {
  		if (this.state.isLogged) {
	       return <Redirect to='/'/>;
     	}
	    return (
	      	<MDBContainer id="main-content">
                <form onSubmit={(e)=>{e.preventDefault();this.checkPass()}}>
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
	                                      { !this.state.isSecret?<h5 className="text-center white-text">Please set your password!</h5>:'' }
	                                      <div className="md-form">
	                                          <MDBInput label="Your password" ref='secret' className="secret" icon="lock" type="password"/>
	                                      </div>
	                                      <div className="text-center">
	                                          <button type="submit" className="btn purple-gradient btn-lg waves-effect waves-light btn-login">Sign In</button>
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
