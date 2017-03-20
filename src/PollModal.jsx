import React, { Component } from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';
import Button from 'react-bootstrap/lib/Button';

export default class PollModal extends Component {
  constructor(props) {
    super(props);
    this.handleModalClose = this.handleModalClose.bind(this);
  }

  handleModalClose() {
    this.props.onModalClose();
  }

  render() {
    const optionNodes = [];
    for (let i = 0; i < 3; i += 1) {
      optionNodes[i] = <FieldGroup id={`formControlsOption${i}`} type="text" placeholder={'Enter option ' + (i + 1) + ' here...'} />
    }// make dynamic

    return (
      <Modal show={this.props.showModal} onHide={this.handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add a Poll</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <FieldGroup
              id="formControlsTitle" label="Title" type="text" placeholder="Enter title here..."
            />
            {optionNodes}
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.handleModalClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

PollModal.propTypes = {
  onModalClose: React.PropTypes.func.isRequired,
  showModal: React.PropTypes.func.isRequired,
};

export function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}

{/* <FieldGroup
  id="formControlsText"
  type="text"
  label="Text"
  placeholder="Enter text"
/>
<FieldGroup
id="formControlsEmail"
type="email"
label="Email address"
placeholder="Enter email"
/> */}
