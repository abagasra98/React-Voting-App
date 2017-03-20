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

  handleSelectionSubmit(selection) { // use immutability-helper to avoid creating copies
    var votes = this.state.votes;
    votes[selection] += 1;

    let poll = {title: this.state.title, options: this.state.options, votes: votes};
    axios.put(this.props.url, poll)
      .then((res) => {
        console.log('Vote successfully recorded!')
        this.setState({votes: votes});
      })
      .catch (err => {
        console.error(err);
    })
    //this.setState({votes: votes});
    // alert(`You selected: ${selection}`);
    // update votes locally and post to server
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
