import React from "react";
import { Button, Modal } from "semantic-ui-react";

const ErrorModal = props => (
  <Modal
    onClose={props.toggleErrorModal}
    closeOnEscape
    open={props.showErrorModal}
    dimmer="blurring"
  >
    <Modal.Header>Validation</Modal.Header>
    <Modal.Content>There are some invalid fields</Modal.Content>
    <Modal.Actions>
      <Button
        onClick={props.toggleErrorModal}
        positive
        labelPosition="right"
        icon="checkmark"
        content="Ok"
      />
    </Modal.Actions>
  </Modal>
);

export default ErrorModal;
