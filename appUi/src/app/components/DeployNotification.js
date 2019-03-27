import React, { Component } from 'react';

class DeployNotification extends Component {

  	render() {
	    return (
		  	<div className="col-md-3 mb-4">
			    <div className="card mb-4">
			      <div className="card-body">
			        <div className="list-group list-group-flush">
			          <a className="list-group-item list-group-item-action waves-effect" href="#visited">Visited
			            <span className="badge badge-primary badge-pill pull-right ml-2">{this.props.visited}
			            </span>
			          </a>
			          <a className="list-group-item list-group-item-action waves-effect" href="./user/farm">Farm
			            <span className="badge badge-success badge-pill pull-right ml-2">{this.props.farm}
			            </span>
			          </a>
			          <a className="list-group-item list-group-item-action waves-effect" href="./user/factory">Factory
			            <span className="badge badge-warning badge-pill pull-right ml-2">{this.props.factory}					              
			            </span>
			          </a>
			          <a className="list-group-item list-group-item-action waves-effect" href="./user/store">Store
			            <span className="badge badge-danger badge-pill pull-right ml-2">{this.props.store}</span>
			          </a>
			        </div>
			      </div>
			    </div>
		  	</div>
	    );
  	}
}

export default DeployNotification;
