import React, { Component } from 'react';

class FarmFooter extends Component {

  	render() {
	    return (
	      	<footer className="page-footer text-center font-small primary-color-dark darken-2 mt-4 wow fadeIn">
		      	<div className="pt-4">
			        <a className="btn btn-outline-white" href="#123" target="_blank"
			          role="button">
			          <i className="fas fa-arrow-left mr-2"></i> Prev btn
			        </a>
			        <a className="btn btn-outline-white" href="#123" target="_blank" role="button">Next btn
			          <i className="fas fa-arrow-right ml-2"></i>
			        </a>
		      	</div>
		      	<hr className="my-4" />
		      	<div className="pb-4">
			        <a href="#123" target="_blank">
			          <i className="fab fa-facebook-f mr-3"></i>
			        </a>

			        <a href="#123" target="_blank">
			          <i className="fab fa-twitter mr-3"></i>
			        </a>

			        <a href="#123" target="_blank">
			          <i className="fab fa-youtube mr-3"></i>
			        </a>

			        <a href="#123" target="_blank">
			          <i className="fab fa-google-plus mr-3"></i>
			        </a>

			        <a href="#123" target="_blank">
			          <i className="fab fa-dribbble mr-3"></i>
			        </a>

			        <a href="#123" target="_blank">
			          <i className="fab fa-pinterest mr-3"></i>
			        </a>

			        <a href="#123" target="_blank">
			          <i className="fab fa-github mr-3"></i>
			        </a>

			        <a href="#123" target="_blank">
			          <i className="fab fa-codepen mr-3"></i>
			        </a>
		      	</div>
		      	<div className="footer-copyright py-3">
			        © 2019 Copyright.
		      	</div>
		    </footer>
	    );
  	}
}

export default FarmFooter;
