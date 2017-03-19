import React, {Component} from 'react';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import Button from 'react-bootstrap/lib/Button';

class PollForm extends Component {
  constructor(props) {
    super(props);
    this.state = {selection: ''}; // store index instead of selection
    this.handleSelectionChange = this.handleSelectionChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSelectionChange(e) {
    this.setState({selection: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    let selection = this.state.selection.trim(); // get current user too?

    if (!text)
      return;

    this.props.onSelectionSubmit({selection: selection});
    this.setState({selection: ''});
  }

  render() {
    let pollOptions = this.props.options.map(option => {
      return (
        <option value={option}>{option}</option>
      );
    });

    return (
      <form onSubmit={this.handleSubmit}>
        <FormGroup controlId="formControlsSelect">
          <ControlLabel>I'd like to vote for:</ControlLabel>
          <FormControl componentClass="select" placeholder="Choose an option" onChange={this.handleSelectionChange}>
            {pollOptions}
          </FormControl>
        </FormGroup>

        <Button type="submit">Submit</Button>
      </form>
    );
  }
}
