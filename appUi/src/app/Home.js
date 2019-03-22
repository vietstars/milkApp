import React, { Component } from 'react';
import {MDBContainer} from 'mdbreact';

class Home extends Component {

  	constructor(props){
	    super(props)
	    this.state = {
	      loading: true
	    }
  	}

  	render() {
	    return (
	      	<MDBContainer id="main-content">
				<section className="view intro-2"></section>
	      	</MDBContainer>
	    );
  	}
}

export default Home;
