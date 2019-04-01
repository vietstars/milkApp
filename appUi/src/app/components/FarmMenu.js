import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';

withRouter(props => <FarmMenu {...props}/>);

class FarmMenu extends Component {

	constructor(props){
	    super(props)
	    this.state = {
	       paths: ['/farm/Invoice','/farm/History'],
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
		          	<a href="/farm" className={this.state.paths.indexOf(pathname)===-1?"list-group-item list-group-item-action waves-effect active":"list-group-item list-group-item-action waves-effect"}>
			            <i className="fas fa-chart-pie mr-3"></i>Dashboard</a>
		          	<a href="/farm/Invoice" className={pathname === '/farm/Invoice'?"list-group-item list-group-item-action waves-effect active":"list-group-item list-group-item-action waves-effect"}>
			            <i className="fas fa-file-invoice-dollar mr-3"></i>Invoice</a>
		          	<a href="/farm/History" className={pathname === '/user/factory'?"list-group-item list-group-item-action waves-effect active":"list-group-item list-group-item-action waves-effect"}>
			            <i className="fas fa-history mr-3"></i>History</a>
		        </div>
	      	</section>
	    );
  	}
}

export default FarmMenu;
