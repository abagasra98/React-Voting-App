import React, {Component} from 'react';
import axios from 'axios';
import Jumbotron from 'react-bootstrap/lib/Jumbotron';
import Button from 'react-bootstrap/lib/Button'
import PollModal from './PollModal';
import PollList from './PollList';

class PollBox extends Component {
  constructor(props) {
    super(props);

    this.state = {data: [], showModal: false};
    this.loadPollsFromServer = this.loadPollsFromServer.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.showModal = this.showModal.bind(this);
  }

  loadPollsFromServer() {
    axios.get(this.props.url).then(res => {
      this.setState({data: res.data});
    });
  }

  showModal() {
    this.setState({showModal: true});
  }

  closeModal() {
    this.setState({showModal: false});
  }

  componentDidMount() {
    this.loadPollsFromServer();
  }

  render() {
    return (
      <Jumbotron className="text-center">
        <h2>React Voting App</h2>
        <h4>Select a poll to see the results and vote, or sign-in to make a new poll.</h4>
        <PollList data={this.state.data} />

        <PollModal showModal={this.state.showModal} onModalClose={this.closeModal} />
        <Button bsStyle="primary" bsSize="large" onClick={this.showModal}>
          Add a Poll
        </Button>

      </Jumbotron>
    );
  }
}

export default PollBox;
