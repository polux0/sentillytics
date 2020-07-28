import React, { Component } from 'react';
import {Chart} from '../components/Chart';

const name = 'Vojno';

const arr = {true: "vojno", false: "pera"};

class HomePage extends Component {

	constructor(props) {
	    super(props);
	    this.state = {date: new Date()};
	    this.state.isToggleOn = true;

	    // This binding is necessary to make `this` work in the callback
    	this.handleClick = this.handleClick.bind(this);

      this.arr = {true: "upaljeno", false: "ugaseno"};
	}

	

	  handleClick() {
	    this.setState(state => ({
	      isToggleOn: !state.isToggleOn
	    }));
	  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }



  render() {
    return (
      <div>
        {/*Home page current time: {this.state.date.toLocaleTimeString()} 
        <List abc={this.arr[this.state.isToggleOn.toString()]} />
        <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
        </button>
        <Chart />
        <Ajaxtest />
        */}
      </div>
      
    )
  }
}

export default HomePage;