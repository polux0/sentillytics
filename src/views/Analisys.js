import React, { Component } from 'react';
import Demo from '../components/Demo';

class Analisys extends Component {

	constructor(props) {
	    super(props);
	}

  render() {
    return (
      <div>
        <h1>Analisys</h1>
        <p>{this.props.match.params.lang}</p>
        <Demo />
      </div>
      
    )
  }
}

export default Analisys;