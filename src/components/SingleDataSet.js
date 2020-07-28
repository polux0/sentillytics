import React, { Component } from  'react';
import { Dropdown } from 'semantic-ui-react';

export default class SingleDataSet extends Component {

	handleChange = (e, {value}) => this.props.onDataSetChanges(value);

	render(){

		//- group by (sa mogucim vrednostima: day, week, month, keyword, project_id...)

		const options = [

		 {key: 'count', text: 'count', value: 'count'},
		 {key: 'average post', text: 'average post', value:'average post'},
		 {key: 'retweet count', text: 'retweet count', value: 'retweet count'},
		 {key: 'likes count', text: 'likes count', value: 'likes count'}

		]
		//pass state as a props
		const value = this.props.dataset;

		return(

			<Dropdown
	            options={options}
	            placeholder='Choose desired dataset'
	            selection
	            value={value}
	            onChange={this.handleChange}
          	/>
		)	
	}
}