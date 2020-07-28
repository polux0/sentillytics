import React, { Component } from 'react'
import { Dropdown } from 'semantic-ui-react'


export default class DropdownMultipleSelection extends Component{

	constructor(props){
		super(props);
	}

	handleChange = (e, {value}) => {
		this.props.onDataSetsChanges({value});
	}

	render(){

	const options = [
		 {key: 'count', text: 'count', value: 'count'},
		 {key: 'average post', text: 'average post', value:'average post'},
		 {key: 'retweet count', text: 'retweet count', value: 'retweet count'},
		 {key: 'likes count', text: 'likes count', value: 'likes count'}
	]
	
	return <Dropdown 
				placeholder='Choose desired datasets'
				fluid multiple selection options={options} 
				onChange={this.handleChange}
			/>

	}

	
}