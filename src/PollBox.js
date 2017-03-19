import React, {Component} from 'react';
import axios from 'axios';
import Jumbotron from 'react-bootstrap/lib/Jumbotron';
import PollList from './PollList';

class PollBox extends Component {
  constructor(props) {
    super(props);
    this.state = {data: []};
    this.loadPollsFromServer = this.loadPollsFromServer.bind(this);
  }

  loadPollsFromServer() {
    axios.get(this.props.url).then(res => {
      this.setState({data: res.data});
    });
  }

  componentDidMount() {
    this.loadPollsFromServer();
  }

  render() {
    return (
      <Jumbotron>
        <h2>React Voting App</h2>
        <h4>Select a poll to see the results and vote, or sign-in to make a new poll.</h4>
        <PollList data={this.state.data} />
      </Jumbotron>
    );
  }
}

export default PollBox;
