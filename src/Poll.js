import React, {Component} from 'react';
import axios from 'axios';
import Jumbotron from 'react-bootstrap/lib/Jumbotron';
import PollForm from './PollForm';
import PollChart from './PollChart';
var randomColor = require('randomcolor');

class Poll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      options: [],
      votes: {}
    }; // pass data as props instead since not dynamic

    this.loadPollFromServer = this.loadPollFromServer.bind(this);
    this.handleSelectionSubmit = this.handleSelectionSubmit.bind(this);
    this.getChartData = this.getChartData.bind(this);
  }

  loadPollFromServer() {
    axios.get(this.props.url)
      .then(res => {
        this.setState({
          title: res.data.title,
          options: res.data.options,
          votes: res.data.votes
        });
      });
  }

  handleSelectionSubmit(selection) {
    alert(`You selected: ${selection}`);
    // update votes locally and post to server
    // do stuff
  }

  getChartData() { // add animation options
    let randomColorArray = randomColor({ count: this.state.options.length, hue: 'random' });
    var datasetElement = {};
    datasetElement['data'] = Object.values(this.state.votes);
    datasetElement['backgroundColor'] = randomColorArray;
    datasetElement['hoverBackgroundColor'] = randomColorArray;

    var data = {};
    data['labels'] = this.state.options;
    data['datasets'] = [datasetElement];

    console.log(data);
    return data;
  }

  componentDidMount() {
    this.loadPollFromServer();
  }

  render() { // return div element with Bootstrap grid-row-columns
    return (
      <Jumbotron className='text-center'>
        <p>{this.state.title}</p>
        <PollForm onSelectionSubmit={this.handleSelectionSubmit} options={this.state.options} />
        <PollChart data={this.getChartData()} />
      </Jumbotron>
    );
  }
}

export default Poll;
