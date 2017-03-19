import React, {Component} from 'react';
import {Doughnut} from 'react-chartjs-2';

class PollChart extends Component {
  render() {
    return <Doughnut data={this.props.data} options={this.props.options} />
  }
}

export default PollChart;
