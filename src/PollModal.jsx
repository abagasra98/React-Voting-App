import React, { Component } from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import Button from 'react-bootstrap/lib/Button';
import style from './style';

export default class PollModal extends Component {
  constructor(props) {
    super(props);

    this.handleModalClose = this.handleModalClose.bind(this);
    this.handleOptionChange = this.handleOptionChange.bind(this);
    this.state = {
      optionCount: 3,
      filledOptions: 0,
      checkedElements: [],
    };
  }

  handleOptionChange(e) {
    const checkedElements = this.state.checkedElements;

    if (checkedElements.indexOf(e.target) === -1) {
      const oldFilledCount = this.state.filledOptions;

      if (oldFilledCount + 1 >= this.state.optionCount) {
        const oldOptionCount = this.state.optionCount;
        this.setState({ optionCount: oldOptionCount + 1 });
      }

      checkedElements.push(e.target);
      this.setState({ filledOptions: oldFilledCount + 1, checkedElements });
    }
  }

  handleModalClose() {
    this.props.onModalClose();
  }

  render() {
    return (
      <Modal show={this.props.showModal} onHide={this.handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add a Poll</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <FieldGroup
              id="formControlsTitle" label="Title" numElements={1}
              type="text" placeholder="Enter title here..."
            />
            <FieldGroup
              id="formControlsOptions" label="Options" numElements={this.state.optionCount}
              type="text" placeholder="Enter option here..." onFocus={this.handleOptionChange}
            />
            <div className="well" style={style.wellStyles}>
              <Button type="submit" bsStyle="primary" bsSize="large" block>Submit</Button>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.handleModalClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export function FieldGroup({ id, label, numElements, ...props }) {
  const formNodes = [];
  for (let i = 0; i < numElements; i += 1) {
    formNodes[i] = <FormControl style={style.formStyle} key={i} {...props} />;
  }

  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      {formNodes}
    </FormGroup>
  );
}

PollModal.propTypes = {
  onModalClose: React.PropTypes.func.isRequired,
  showModal: React.PropTypes.bool,
};

PollModal.defaultProps = {
  showModal: false,
};

FieldGroup.propTypes = {
  id: React.PropTypes.string.isRequired,
  label: React.PropTypes.string.isRequired,
  numElements: React.PropTypes.number,
};

FieldGroup.defaultProps = {
  numElements: 1,
};
