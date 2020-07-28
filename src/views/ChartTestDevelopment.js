import React, { Component } from 'react';
import Highcharts, { chart } from "highcharts/highstock";
import Chart1 from '../components/Chart1';



class ChartTestDevelopment extends Component {

	constructor(props) {
      super(props);

      this.state = {

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
          }]
        
        }
  }
  componentDidMount(){
    console.log(this.state);
  }

  render() {
    return (
      <div>
        
        <Chart1 highcharts={Highcharts} options={this.state} />

      </div>
      
    )
  }
}

export default ChartTestDevelopment;