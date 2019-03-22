import React, { Component } from 'react';

class DeployFactory extends Component {

  	render() {
	    return (
	      	<main className="pt-5 mx-lg-5">
				<div className="container-fluid mt-5">
					<div className="card mb-4 wow fadeIn">
					  <div className="card-body d-sm-flex justify-content-between">
					    <h4 className="mb-2 mb-sm-0 pt-1">
					      <a href="#123" target="_blank">Deploy</a>
					      <span>/</span>
					      <span>Dashboard</span>
					    </h4>
					    <form className="d-flex justify-content-center">
					      <input type="search" placeholder="Type your query" aria-label="Search" className="form-control" />
					      <button className="btn btn-primary btn-sm my-0 p" type="submit">
					        <i className="fas fa-search"></i>
					      </button>
					    </form>
					  </div>
					</div>
					<div className="row wow fadeIn">
					  <div className="col-md-9 mb-4">
					    <div className="card">
					      <div className="card-header">Your processing</div>
					      <div className="card-body">
					      <h1>Factory</h1>
					    </div>
					    </div>        
				  	</div>
				  	<div className="col-md-3 mb-4">
					    <div className="card mb-4">
					      <div className="card-body">
					        <div className="list-group list-group-flush">
					          <a className="list-group-item list-group-item-action waves-effect" href="#123">Farmer
					            <span className="badge badge-success badge-pill pull-right">2
					              <i className="fas fa-plus ml-1"></i>
					            </span>
					          </a>
					          <a className="list-group-item list-group-item-action waves-effect" href="#123">Factory
					            <span className="badge badge-warning badge-pill pull-right">5
					              <i className="fas fa-plus ml-1"></i>
					            </span>
					          </a>
					          <a className="list-group-item list-group-item-action waves-effect" href="#123">Store
					            <span className="badge badge-danger badge-pill pull-right">0</span>
					          </a>
					        </div>
					      </div>
					    </div>
					  </div>
					</div>
				</div>
		    </main>
	    );
  	}
}

export default DeployFactory;
