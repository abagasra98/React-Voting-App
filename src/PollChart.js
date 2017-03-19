import React, {Component} from 'react';
import {Doughnut} from 'react-chartjs-2';

class PollChart extends Component {
  render() {
    let options = { // make dynamic using props
        animation:{
            animateScale:true
        }
    };

    return <Doughnut data={this.props.data} options={options} />
  }
}

export default PollChart;
