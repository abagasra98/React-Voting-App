import React, { Component } from 'react';
import axios from 'axios';
import Jumbotron from 'react-bootstrap/lib/Jumbotron';
import Button from 'react-bootstrap/lib/Button';
import PollModal from './PollModal';
import PollList from './PollList';

export default class PollBox extends Component {
  constructor(props) {
    super(props);

    this.state = { data: [], showModal: false };
    this.loadPollsFromServer = this.loadPollsFromServer.bind(this);
    this.onModalFormSubmit = this.onModalFormSubmit.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.showModal = this.showModal.bind(this);
  }

  componentDidMount() {
    this.loadPollsFromServer();
  }

  onModalFormSubmit(poll) {
    // remove when authentication is implemented
    poll.ownerName = 'Ninja Zilles';
    poll.ownerId = 123456;

    // avoid contacting server to reduce network load (make local id and use that)
    // const polls = this.state.data;
    // polls.push(poll);
    // this.setState({ data: polls });

    axios.post(this.props.url, poll).then(() => {
      // optimize (see above)
      this.loadPollsFromServer();
    }).catch((err) => {
        console.error(err);
    });
  }

  loadPollsFromServer() {
    axios.get(this.props.url).then((res) => {
      this.setState({ data: res.data });
    });
  }

  showModal() {
    this.setState({ showModal: true });
  }

  closeModal() {
    this.setState({ showModal: false });
  }

  render() {
    return (
      <Jumbotron className="text-center">
        <h2>React Voting App</h2>
        <h4>Select a poll to see the results and vote, or sign-in to make a new poll.</h4>
        <PollList data={this.state.data} />

        <PollModal
          showModal={this.state.showModal} onModalClose={this.closeModal}
          onFormSubmit={this.onModalFormSubmit}
        />
        <Button bsStyle="primary" bsSize="large" onClick={this.showModal}>
          Add a Poll
        </Button>

      </Jumbotron>
    );
  }
}

PollBox.propTypes = {
  url: React.PropTypes.string.isRequired,
};
