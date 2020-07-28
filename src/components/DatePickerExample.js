import React from "react";
import { DatePicker } from '@y0c/react-datepicker';
import moment from 'moment';

import '@y0c/react-datepicker/assets/styles/calendar.scss';


export default class DatePickerExample extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      startDate: moment().format('YYYY-MM-DD'),
      endDate: moment().format('YYYY-MM-DD')
    };

  }

  handleChange = ({ startDate, endDate }) => {

    startDate = startDate || this.state.startDate;
    endDate = endDate || this.state.endDate;

    if (startDate < endDate) {

      console.log('Everything is all right');
      endDate = startDate;
    }
    else console.log('Please choose correct dates');
    this.props.onDateRangeChanges({startDate, endDate});

    this.setState({ startDate, endDate });
  };

  handleChange1 = ({startDate}) => this.props.onStartDateChanges(startDate);

  handleChange2 = ({endDate}) => this.props.onEndDateChanges(endDate);

  handleChangeStart = startDate => this.handleChange1({ startDate });

  handleChangeEnd = endDate => this.handleChange2({ endDate });


  render() {
    return (
      <div className="row">
        <div className="column">
          <DatePicker
            selected={this.state.startDate}
            selectsStart
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            onChange={this.handleChangeStart}
          />
          <DatePicker
            selected={this.state.endDate}
            selectsEnd
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            onChange={this.handleChangeEnd}
          />
        </div>
      </div>
    );
  }
}
