import React, {Component} from 'react';
import moment from 'moment';
import Highcharts, { chart } from "highcharts/highstock";
import '../App.css';
import Chart1 from './Chart1';
import DatePickerExample from './DatePickerExample';
import DropDownSingleSelection from './DropDownSingleSelection';
import GroupByFilter from './GroupByFilter';
import analytics from '../apis/analytics';

require("highcharts/indicators/indicators")(Highcharts);
require("highcharts/indicators/pivot-points")(Highcharts);
require("highcharts/indicators/macd")(Highcharts);
require("highcharts/modules/exporting")(Highcharts);
require("highcharts/modules/map")(Highcharts);


export default class AnotherTest extends Component {

   constructor(props){
     super(props);

     this.state = {

      chartData: {

        chart: {
            type: 'bubble',
            plotBorderWidth: 1,
            zoomType: 'xy',
            layoutAlgorithm: {
              gravitationalConstant: 0.05,
              splitSeries: true,
              seriesInteraction: false,
              dragBetweenSeries: true,
              parentNodeLimit: true 
            }
      
          },
      
          title: {
              text: 'Highcharts bubbles with radial gradient fill'
          },
      
          xAxis: {
              gridLineWidth: 1
          },
      
          yAxis: {
              startOnTick: false,
              endOnTick: false
          },
      
          series: [{
              data: [
                  [9, 81, 63],
                  [98, 5, 89],
                  [51, 50, 73],
                  [41, 22, 14],
                  [58, 24, 20],
                  [78, 37, 34],
                  [55, 56, 53],
                  [18, 45, 70],
                  [42, 44, 28],
                  [3, 52, 59],
                  [31, 18, 97],
                  [79, 91, 63],
                  [93, 23, 23],
                  [44, 83, 22]
              ],
          }, {
              data: [
                  [42, 38, 20],
                  [6, 18, 1],
                  [1, 93, 55],
                  [57, 2, 90],
                  [80, 76, 22],
                  [11, 74, 96],
                  [88, 56, 10],
                  [30, 47, 49],
                  [57, 62, 98],
                  [4, 16, 16],
                  [46, 10, 11],
                  [22, 87, 89],
                  [57, 91, 82],
                  [45, 15, 98]
              ],
          }]},
      dataset: '',
      datasets: [],
      startDate : moment().format('YYYY-MM-DD'),
      endDate: moment().format('YYYY-MM-DD'),
      groupBy: '',
      chartType: '',
      filters: [
        {key: 'count', text: 'count', value: 'count', id:0},
        {key: 'average post', text: 'average post', value:'average post', id:1},
        {key: 'retweet count', text: 'retweet count', value: 'retweet count', id:2},
        {key: 'likes count', text: 'likes count', value: 'likes count', id:3}
     ],
     selectedFilter: ''
      

     }

   }

onGlobalStateChange = async (chartID) => {


     const response = await analytics.post('/analysis', {

        data: {
          
          from: this.state.startDate,
          to: this.state.endDate, 
          dataset: this.state.dataset,
          groupBy: this.state.groupBy,

        }
     })
     return response.data;  
  }
  //callbacks for child components;
onStartDateChanges = async startDate => {

      this.setState({startDate}, async () => {
          
          let test = await this.onGlobalStateChange(1);
          //console.log(test);
      })

  }
onEndDateChanges = async endDate => {

      this.setState({endDate}, async () => {
          
          let test = await this.onGlobalStateChange(1);
          console.log(test);
      })

  }
onGroupByFilterChanges = async groupBy => {

    this.setState({groupBy}, async () => {
          
          let test = await this.onGlobalStateChange(1);

          console.log(test);

      })

  }
onChartTypeChanges = (type, {receiveChartType}) => {

    console.log('desilo se');
    console.log(receiveChartType);
    let chartType = {...this.state.chartType};
    let chartData = {...this.state.chartData};

    if(type!=='bubble'){
      
      let series = chartData.series.map(index => {
          return index;
      })
      let anotherSeries = series.map(index => {
          index.type = type;
          return index;
      })
      chartData.series = anotherSeries;
      chartType = type;
      
      this.setState({chartData, chartType});
      
      this.updateLabels();

    }
    else{

      this.receiveChartType(type);
      this.setState({chartData, chartType});

    } 
    
    
}
updateLabels = () => {

    let labels = ['Jan', 'Feb', 'Mar', 'Apr', 'Kenedi', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'testina'];

    let chartData = {...this.state.chartData};
    
    chartData.xAxis.categories = labels;

    this.setState({chartData});

}
updateDataSet = () => {

    let chartData = {...this.state.chartData};
   
    let name = 'testname';
    let data = [Math.random()*20000, Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*20000];
    let type = this.state.chartType;

    let object = {
      name: name,
      data: data,
      type: type
    }

    // let series = chartData.series.map(index => {
    //   return index;
    // })

    
    chartData.series.push(object);

    this.setState({chartData});

}

componentDidUpdate(){

    console.log('Everything is statefull now');
    console.log(this.state.chartData);

  }
  handleSelectedFilter = event =>{
    
    let selectedFilter = event.target.value;

    let datasets = this.state.datasets;

    if(!datasets.includes(selectedFilter))
    {
        datasets.push(event.target.value);
     
        this.setState({selectedFilter, datasets});
     
        this.updateDataSet(event.target.value);
    }

  }
  removeFilter = (item, index) => {

    // removing dataset from series;

    let chartData = {...this.state.chartData};

    let updatedSeries = chartData.series;

    updatedSeries.splice(index, 1);

    chartData.series = updatedSeries;

    this.setState({chartData});


    // for removing from a list HTML/CSS list only; 

    let newDatasets = this.state.datasets;

    newDatasets.map((itm, index) => {

      if(itm == item) newDatasets.splice(index, 1);

      this.setState({datasets: newDatasets})
    
    })
  }


  render() {

	return(  

        <div className="graphicon" key='1'>
        <h1> Demos </h1>
        <br />
        <DatePickerExample onStartDateChanges={this.onStartDateChanges} onEndDateChanges={this.onEndDateChanges} />
        <br />
        <br />
        <DropDownSingleSelection onChartTypeChanges={this.onChartTypeChanges} value={this.state.chartType}/>
        <br />
        <GroupByFilter onGroupByFilterChanges={this.onGroupByFilterChanges} value={this.state.groupBy} />
        <br />
        <br />
        <select value={this.state.selectedFilter} onChange={this.handleSelectedFilter}>
          <option >Select Country</option>
            {this.state.filters.map(function(item, index){
              return(
                <option value={item.key} key={index} >{item.value}</option>
              )},this
            )};
        </select>
        <div>
            {this.state.datasets.map(function(item, index){
                return(
                    <div className="keyword" key={index} >
                      {item}
                      
                      <button className="keyword-delete-button" onClick={() => this.removeFilter(item, index)} key={item.id} >X</button>
                    </div>
                  );
              }, this)}
        </div>
        <br />
        <Chart1 highcharts={Highcharts} options={this.state.chartData} />
        <br />
        <br />
        <div className="add-project">
        <i className="circle plus icon" onClick={()=> this.props.onAddProject()}></i>
        <i className="circle minus icon" onClick={()=> this.props.onRemoveProject()}></i>
        </div>
        <br />
        <br />
        </div>

	)

}
}