import React, {Component} from 'react';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import Button from 'react-bootstrap/lib/Button';

class PollForm extends Component {
  constructor(props) {
    super(props);
    this.state = {selection: '', isInitialSelection: true}; // store index instead of selection
    this.handleSelectionChange = this.handleSelectionChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSelectionChange(e) {
    this.setState({selection: e.target.value, isInitialSelection: false});
  }

  handleSubmit(e) {
    e.preventDefault();
    let selection = this.state.selection.trim(); // get current user too?

    if (!selection)
      return;

    this.props.onSelectionSubmit(selection);
    this.setState({selection: ''});
  }

  render() {
    let pollOptions = this.props.options.map((option, index) => {
      return (
        <option value={option} key={index}>{option}</option>
      );
    });

    return (
      <form onSubmit={this.handleSubmit}>
        <FormGroup controlId="formControlsSelect">
          <ControlLabel>I'd like to vote for:</ControlLabel>
          <FormControl componentClass="select" placeholder="Choose an option" onChange={this.handleSelectionChange}>
            {(this.state.isInitialSelection) ? (<option value="Choose an option" key="-1">Choose an option</option>) : null}
            {pollOptions}
          </FormControl>
        </FormGroup>

        <Button bsStyle="primary" bsSize="large" type="submit">Submit</Button>
      </form>
    );
  }
}

export default PollForm;
