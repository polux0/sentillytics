import React, { Component } from 'react';
import { Dropdown } from 'semantic-ui-react'

export default class DropDownSingleSelection extends Component {

	constructor(props){
		super(props)
		
	}
	handleChange = (e, {value}) => this.props.onChartTypeChanges(value);

	render(){

		const options = [
		  { key: 1, text: 'line', value: 'line' },
		  { key: 2, text: 'area', value: 'area' },
		  { key: 3, text: 'bar', value: 'bar' },
		  { key: 4, text: 'pie', value: 'pie'}, 
		  { key: 5, text: 'bubble', value:'bubble'},
		  { key: 6, text: 'scatter', value: 'scatter'}
		]
		//pass state as a props
		const value = this.props.type;

		return(

			<Dropdown
	            options={options}
	            placeholder='Please choose chart type'
	            selection
	            value={value}
	            onChange={this.handleChange}
          	/>
		)	
	}
}
