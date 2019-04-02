import React, { Component } from 'react';

class DeployNotification extends Component {

  	render() {
	    return (
		  	<div className="col-md-3 mb-4">
			    <div className="card mb-4">
			      <div className="card-body">
			        <div className="list-group list-group-flush">
			          <a className="list-group-item list-group-item-action waves-effect" href="/user">Visited
			            <span className="badge badge-primary badge-pill float-right ml-2">{this.props.visited}
			            </span>
			          </a>
			          
			          <a className="list-group-item list-group-item-action waves-effect" href="/user/farm">Farm 
			            <sup><sup className={parseInt(this.props.farm)>0?'badge badge-danger badge-pill pull-right ml-2':'badge badge-warning badge-pill pull-right ml-2'} title="Farm pedding">{this.props.farm}
			            </sup></sup>
			            <span className="badge badge-success badge-pill float-right ml-2" title="Farm accounts">{this.props.farmCount}
			            </span>
			          </a>
			          <a className="list-group-item list-group-item-action waves-effect" href="/user/factory">Factory
			            <sup><sup className={parseInt(this.props.factory)>0?'badge badge-danger badge-pill pull-right ml-2':'badge badge-warning badge-pill pull-right ml-2'} title="Factory pedding">{this.props.factory}					              
			            </sup></sup>
			            <span className="badge badge-warning badge-pill float-right ml-2" title="Factory accounts">{this.props.factoryCount}					              
			            </span>
			          </a>
			          <a className="list-group-item list-group-item-action waves-effect" href="/user/store">Store
			            <sup><sup className={parseInt(this.props.store)>0?'badge badge-danger badge-pill pull-right ml-2':'badge badge-warning badge-pill pull-right ml-2'} title="Store pedding">{this.props.store}</sup></sup>
			            <span className="badge badge-danger badge-pill float-right ml-2" title="Store accounts">{this.props.storeCount}</span>
			          </a>
			        </div>
			      </div>
			    </div>
		  	</div>
	    );
  	}
}

export default DeployNotification;
