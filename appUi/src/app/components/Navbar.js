import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import {MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavbarToggler, MDBCollapse, MDBIcon} from "mdbreact";
import swal from 'sweetalert';
import Web3 from 'web3';
import {APP_LIST_ABI,APP_LIST_ADDRESS} from '../sys/DalatMilk';
import {GET,RMO} from '../sys/AppResource';
import Loading from './Loading';

withRouter(props => <Navbar {...props}/>);

class Navbar extends Component {

	// componentDidMount(){
			
 //  	}

	componentWillMount(){
		const {pathname} = this.props.location;
		var _pass=0;
  		if(window.ethereum===undefined||!window.ethereum.isMetaMask)
  			swal("Please connect to Metamask.","Our blockchain tech using that extension!",'error').then(()=>{
  				if(!this.state.paths.indexOf(pathname)===-1 || pathname==='/login' || pathname ==='/register'){
  					window.location.href='/'
  				}}
  				)
  		else
  			window.ethereum.on('accountsChanged', ()=>{_pass>0?window.location.reload():_pass++;})
		this.loadBlockchainData()
  	}

  	async loadBlockchainData(){
    	let self = this;
  		const {pathname} = this.props.location;
	    const web3 = new Web3(Web3.givenProvider || "http://localhost:7545")
	    // const network = await web3.eth.net.getNetworkType()
	    // const network = await web3.eth.net.getId()
	    // const network = await web3.currentProvider
	    // const accounts = await web3.eth.getAccounts()
	    const dalatMilk = new web3.eth.Contract(APP_LIST_ABI,APP_LIST_ADDRESS )
	    await web3.eth.getCoinbase((eror,account)=>{
	    	this.setState({ account })
	    })
	    if(!this.state.account){
	    	swal("Please connect to Metamask","Our blockchain tech using that extension!",'error').then(()=>{
	    		if(!this.state.paths.indexOf(pathname)===-1 || pathname==='/login' || pathname ==='/register'){
  					window.location.href='/'
  				}
	    		setTimeout(function(){
					self.setState({ loading: false})
				}, 2000)
	    	})
	    }else{
	    	if(!this.state.isLogged){
		    	await GET('logged/'+this.state.account).then((res)=>{
			    	if(res.exp>(Date.now()/1e3)){
				    	this.setState({isLogged: true})
			    	}
		    	})
		    	if(pathname === '/login'||pathname === '/register'){
		    		await dalatMilk.methods.isOwner().call({from:this.state.account}).then((res)=>{
				    	if(res){
				    		this.setState({ actor: 1, loading:false })		    		
				    	}else{
				    		setTimeout(function(){
								self.setState({ loading: false})
							}, 2000)	
				    	}
				    }).catch(()=>{
				    	swal("Please connect to Metamask.","Our blockchain tech using that extension!",'error').then(()=>{
				    		window.location.href = '/'
				    	})
				    });
		    	}else{
		    		setTimeout(function(){
						self.setState({ loading: false})
					}, 2000)	
		    	}
	    	}
	    	if(this.state.isLogged){
	    		if(pathname === '/login'||pathname === '/register'){
	    			window.location.href = '/'
	    		}
	    		await dalatMilk.methods.isOwner().call({from:this.state.account}).then((res)=>{
			    	if(res){
			    		this.setState({ actor: 1, loading:false })		    		
			    	}else{
			    		setTimeout(function(){
							self.setState({ loading: false})
						}, 2000)	
			    	}
			    }).catch(()=>{
			    	swal("Please connect to Metamask.","Our blockchain tech using that extension!",'error').then(()=>{
			    		window.location.href = '/'
			    	})
			    });
	    	}
	    }
  	}

	constructor(props){
	    super(props)
	    this.state = {
	       loading: true,
	       paths: ['/about','/customer','/guide','/login','/register'],
	       panels: ['','/user','/factory','/store'],
	       account:false,
	       isOpen:false,
	       isLogged:false,
	       actor:0
	    }
  	}
  	logout(){
  		RMO('logged/'+this.state.account).then((res)=>{
    		this.setState({isLogged:false})
    		window.location.reload()
	    })
  		swal('Logout finish!','Thanks.','success');
  	}
  	render() {
	    const {pathname} = this.props.location;
	    const toggleCollapse = () => {
		  this.setState({ isOpen: !this.state.isOpen });
		}
		//actor:0 && account in node data for register (!)
		const _panel = this.state.isLogged?<MDBNavItem><a className="nav-link waves-effect" href={this.state.panels[this.state.actor]}>Panel</a></MDBNavItem>:(this.state.actor===0?<MDBNavItem active={pathname === '/register'?true:false}><a className="nav-link waves-effect" href="./register">Register</a></MDBNavItem>:'');
		const _logout = this.state.actor>0 && this.state.isLogged?<MDBNavItem active className="color-block peach-gradient z-depth-1"><a className="nav-link white-text waves-effect" href='#logout' onClick={this.logout.bind(this)} >Logout</a></MDBNavItem>:<MDBNavItem active={pathname === '/login'?true:false}><a className="nav-link waves-effect" href="./login">Login</a></MDBNavItem>;
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
				          	<MDBNavItem active={this.state.paths.indexOf(pathname)===-1 && (!pathname.includes(this.state.panels[this.state.actor]) || pathname==='/')?true:false}>
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
				          		<a className="nav-link waves-effect" href="/guide">User Guide</a>
				          	</MDBNavItem>
				          	{_panel}
				        </MDBNavbarNav>
				        <MDBNavbarNav right>
				          	{_logout}
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
