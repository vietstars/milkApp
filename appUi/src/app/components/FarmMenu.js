import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';

withRouter(props => <FarmMenu {...props} cookies={instanceOf(Cookies).isRequired} />);

class FarmMenu extends Component {

	constructor(props){
	    super(props)
	    const { cookies } = props;
	    if( parseInt(cookies.get('actor'))!==2 || cookies.get('isLogged')!=='true' )window.location.href='/'; 
	    this.state = {
	       paths: ['/farm/category','/farm/invoice','/farm/milk','/farm/history']
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
		          	<a href="/farm/category" className={pathname === '/farm/category'?"list-group-item list-group-item-action waves-effect active":"list-group-item list-group-item-action waves-effect"}>
			            <i className="fas fa-file-invoice-dollar mr-3"></i>Category management</a>
		          	<a href="/farm/invoice" className={pathname === '/farm/invoice'?"list-group-item list-group-item-action waves-effect active":"list-group-item list-group-item-action waves-effect"}>
			            <i className="fas fa-file-invoice-dollar mr-3"></i>Invoice management</a>
		          	<a href="/farm/milk" className={pathname === '/farm/milk'?"list-group-item list-group-item-action waves-effect active":"list-group-item list-group-item-action waves-effect"}>
			            <i className="fas fa-file-invoice-dollar mr-3"></i>Milk management</a>
		          	<a href="/farm/history" className={pathname === '/farm/history'?"list-group-item list-group-item-action waves-effect active":"list-group-item list-group-item-action waves-effect"}>
			            <i className="fas fa-history mr-3"></i>History</a>
		        </div>
	      	</section>
	    );
  	}
}

export default withCookies(FarmMenu);
