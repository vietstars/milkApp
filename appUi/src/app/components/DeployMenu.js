import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';

withRouter(props => <DeployMenu {...props}/>);

class DeployMenu extends Component {

	constructor(props){
	    super(props)
	    this.state = {
	       paths: ['/user/farm','/user/factory','/user/store'],
	    }
  	}

  	render() {
  		const {pathname} = this.props.location;
	    return (
	      	<section className="sidebar-fixed position-fixed">
		        <a className="logo-wrapper waves-effect" href="#123">
		          	<img src={this.props.logo} className="img-fluid" alt='Logo' />
		        </a>
		        <div className="list-group list-group-flush">
		          	<a href="/user" className={pathname === '/user'?"list-group-item list-group-item-action waves-effect active":"list-group-item list-group-item-action waves-effect"}>
			            <i className="fas fa-chart-pie mr-3"></i>Dashboard</a>
		          	<a href="/user/farm" className={pathname === '/user/farm'?"list-group-item list-group-item-action waves-effect active":"list-group-item list-group-item-action waves-effect"}>
			            <i className="fas fa-user mr-3"></i>Farmer</a>
		          	<a href="/user/factory" className={pathname === '/user/factory'?"list-group-item list-group-item-action waves-effect active":"list-group-item list-group-item-action waves-effect"}>
			            <i className="fas fa-table mr-3"></i>Factory</a>
		          	<a href="/user/store" className={pathname === '/user/store'?"list-group-item list-group-item-action waves-effect active":"list-group-item list-group-item-action waves-effect"}>
			            <i className="fas fa-store mr-3"></i>Store</a>
		        </div>
	      	</section>
	    );
  	}
}

export default DeployMenu;
