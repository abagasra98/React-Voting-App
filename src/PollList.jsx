import React, {Component} from 'react';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
//import './Poll.css';

class PollList extends Component {
  render() {
    let pollNodes = this.props.data.map(poll => {
      return (
        <ListGroupItem href={'/polls/' + poll['_id']} key={poll['_id']}>{poll.title}</ListGroupItem>
      );
    });

    return (
      <ListGroup>
        {pollNodes}
      </ListGroup>
    ); // return inside div?
  }
}

export default PollList;
