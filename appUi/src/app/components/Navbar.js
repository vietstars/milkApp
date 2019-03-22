import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import {MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavbarToggler, MDBCollapse, MDBIcon} from "mdbreact";
import swal from 'sweetalert';
import Web3 from 'web3';
import {APP_LIST_ABI,APP_LIST_ADDRESS} from '../sys/DalatMilk';
import Loading from './Loading';

withRouter(props => <Navbar {...props}/>);

class Navbar extends Component {

	componentDidMount(){
		var self = this;
		setTimeout(function(){
			self.setState({ loading: !self.state.loading})
		}, 2000)	  	
  	}

	componentWillMount(){
		var _pass=0;
  		if(!window.ethereum.isMetaMask)swal("Please connect to Metamask.","Our blockchain tech using that extension!",'error')
  		window.ethereum.on('accountsChanged', ()=>{_pass>0?window.location.reload():_pass++;})
		this.loadBlockchainData()
  	}

  	async loadBlockchainData(){
	    const web3 = new Web3(Web3.givenProvider || "http://localhost:7545")
	    // const network = await web3.eth.net.getNetworkType()
	    // const accounts = await web3.eth.getAccounts()
	    const dalatMilk = new web3.eth.Contract(APP_LIST_ABI,APP_LIST_ADDRESS )
	    await web3.eth.getCoinbase((eror,res)=>{
	    	this.setState({account:res})
	    })
	    if(!this.state.account){
	    	swal("Please connect to Metamask.","Our blockchain tech using that extension!",'error')
	    }else{
		    await dalatMilk.methods.checkApp().call({from:this.state.account}).then((res)=>{
		    	if(res){
		    		this.setState({ actor: 1 })
		    	}
		    })
	    }
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
	       loading: true,
	       paths: ['/about','/customer','/guide'],
	       panels: ['','/user','/factory','/store'],
	       account:'0x0',
	       actor: 0,
	       isOpen:false,
	       isLogged:false
	    }
  	}
	    
  	render() {
	    const {pathname} = this.props.location;
	    const toggleCollapse = () => {
		  this.setState({ isOpen: !this.state.isOpen });
		}
		const _panel =  this.state.actor !== 0 && !pathname.includes(this.state.panels[this.state.actor])?<MDBNavItem><a className="nav-link waves-effect" href={this.state.panels[this.state.actor]}>Panel</a></MDBNavItem>:'';
		const _logout =  this.state.panels[this.state.actor]!=='' && !this.state.isLogged /*pathname.includes(this.state.panels[this.state.actor])*/?<MDBNavItem active className="color-block peach-gradient z-depth-1"><a className="nav-link white-text waves-effect" href='../logout'>Logout</a></MDBNavItem>:'';
	    return (
	    	<header>
	    	{ this.state.loading
				?<Loading />
	      		:<MDBNavbar color="light" className="fixed-top scrolling-navbar white" light expand="md">
			        <MDBNavbarBrand>
			          <strong className="text-primary ml-3">Dalat Milk</strong>
			        </MDBNavbarBrand>
			        <MDBNavbarToggler onClick={ toggleCollapse } />
			        <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
			        	<MDBNavbarNav left>
				          	<MDBNavItem active={this.state.paths.indexOf(pathname)===-1 && !pathname.includes(this.state.panels[this.state.actor])?true:false}>
					            <a className="nav-link waves-effect" href="/">Home 
				                  	<span className="sr-only">(current)</span>
				                </a>
				            </MDBNavItem>
				          	<MDBNavItem active={pathname === '/about'?true:false}>
				          		<a className="nav-link waves-effect" href="/about">About Me</a>
				          	</MDBNavItem>
				          	<MDBNavItem active={pathname === '/customer'?true:false}>
				          		<a className="nav-link waves-effect" href="/customer">Check Infomation</a>
				          	</MDBNavItem>
				          	<MDBNavItem active={pathname === '/guide'?true:false}>
				          		<a className="nav-link waves-effect" href="/guide">Using tutorials</a>
				          	</MDBNavItem>
				          	{_panel}
				          	{_logout}
				        </MDBNavbarNav>
				        <MDBNavbarNav right>
				          <MDBNavItem>
				            <a href="#fb" className="nav-link waves-effect" target="_blank">
				              <MDBIcon fab icon="facebook-f" />
				            </a>
				          </MDBNavItem>
				          <MDBNavItem>
				            <a href="#tw" className="nav-link waves-effect" target="_blank">
				              <MDBIcon fab icon="twitter" />
				            </a>
				          </MDBNavItem>
				          <MDBNavItem>
				            <a href="#gh" className="nav-link waves-effect" target="_blank">
				              <MDBIcon fab icon="github" />
				            </a>
				          </MDBNavItem>
				        </MDBNavbarNav>
				    </MDBCollapse>
			    </MDBNavbar>
	      	}
	    	</header>
	    );
  	}
}

export default Navbar;
