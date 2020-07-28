import React, { Component } from 'react';
import {Bar} from 'react-chartjs-2';
import DatePickerExample from './DatePickerExample';
import Demo from './Demo';

export class Chart extends Component {

	constructor(props) {
		super(props);
		this.state = {
			chartData: {
				labels: ['Boston','London','Beograd','Nis','Novi Sad'],
				datasets: [
				{
					label: 'Population',
					data:[
					333333,
					444444,
					534536,
					245343,
					335526
					],
					backgroundColor: ['rgba(255,33,55,150)', 'rgb(37, 171, 0)', 'rgb(37, 77, 229)', 'rgb(181, 22, 72)', 'rgb(2, 169, 72)']
				},
				// {
				// 	label: 'Broj Stanovnika',
				// 	data:[
				// 	333333,
				// 	444444,
				// 	333333,
				// 	444444,
				// 	534536
				// 	],
				// 	backgroundColor: ['rgb(244, 137, 36)','rgb(244, 137, 36)','rgb(244, 137, 36)', 'rgb(37, 77, 229)', 'rgb(181, 22, 72)']
				// }
				]
			}
		}
	}
	componentDidMount(){

		fetch(`${process.env.REACT_APP_API}/analytics`, 
		      {
		        method: 'post',
		        headers: {'Content-Type':'application/x-www-form-urlencoded'},
		        body: JSON.stringify({
		          userId: this.state.userId
		        })
		      })
		      .then(res => res.json())
		      .then(
		        (result) => {
		          this.setState({
				chartData: {
					labels: result.data.labels,
					datasets: [
					{
						label: 'Population',
						data: result.data.data,
						backgroundColor: ['rgba(255,33,55,150)', 'rgb(37, 171, 0)', 'rgb(37, 77, 229)', 'rgb(181, 22, 72)', 'rgb(2, 169, 72)']
					},
					// {
					// 	label: 'Broj Stanovnika',
					// 	data:[
					// 	333333,
					// 	444444,
					// 	333333,
					// 	444444,
					// 	534536
					// 	],
					// 	backgroundColor: ['rgb(244, 137, 36)','rgb(244, 137, 36)','rgb(244, 137, 36)', 'rgb(37, 77, 229)', 'rgb(181, 22, 72)']
					// }
					]
				}})
		          // console.log('vojno');
		          // console.log(result.data.data);
		          // this.setState({
		          //   chartData: result.data
		          // });
		          //console.log(this.state.projects);
		        },
		        // Note: it's important to handle errors here
		        // instead of a catch() block so that we don't swallow
		        // exceptions from actual bugs in components.
		        (error) => {
		          this.setState({
		            // isLoaded: true,
		            // error
		          });
		        }
		      )
			}

	render(){
		return(

			<div className="chart">
			<Demo />
			</div>



		)
	}
}

export default Chart;