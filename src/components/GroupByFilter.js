import React, {Component} from 'react';
import { Dropdown } from 'semantic-ui-react';

export default class GroupByFilter extends Component{

	handleChange = (e, {value}) => this.props.onGroupByFilterChanges(value);


	render(){

		//- group by (sa mogucim vrednostima: day, week, month, keyword, project_id...)

		const options = [
		  { key: 1, text: 'day', value: 'day' },
		  { key: 2, text: 'week', value: 'week' },
		  { key: 3, text: 'month', value: 'month' },
		  { key: 4, text: 'keyword', value: 'keyword'}, 
		  { key: 5, text: 'project_id', value:'project_id'},
		  { key: 6, text: 'something else', value: 'something else'}
		]
		//pass state as a props
		const value = this.props.groupBy;

		return(

			<Dropdown
	            options={options}
	            placeholder='Group your parameters by'
	            selection
	            value={value}
	            onChange={this.handleChange}
          	/>
		)	
	}

}
