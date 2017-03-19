import React, {Component} from 'react';
import axios from 'axios';
import Jumbotron from 'react-bootstrap/lib/Jumbotron';
import PollForm from './PollForm';

class Poll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      options: []
    }; // pass data as props instead since not dynamic

    this.loadPollFromServer = this.loadPollFromServer.bind(this);
    this.handleSelectionSubmit = this.handleSelectionSubmit.bind(this);
  }

  loadPollFromServer() {
    axios.get(this.props.url)
      .then(res => {
        this.setState({
          title: res.data.title,
          options: res.data.options
        });
      });
  }

  handleSelectionSubmit(poll) {
    // do stuff
  }

  componentDidMount() {
    this.loadPollFromServer();
  }

  render() { // return div element with Bootstrap grid-row-columns
    return (
      <Jumbotron className='text-center'>
        <p>{this.state.title}</p>
        <PollForm onSelectionSubmit={this.handleSelectionSubmit} options={this.state.options} />
      </Jumbotron>
    );
  }
}

export default Poll;
