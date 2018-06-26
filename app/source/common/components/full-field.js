import React from "react";
import { Form, Label, Transition } from "semantic-ui-react";
import { REQUIRED_ERROR } from "../../const/messages";

const errorDictionary = {
  required_error: REQUIRED_ERROR
};

export default class FullField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showErrorLabel: false
    };
    this.getError = this.getError.bind(this);
    this.getErrorDisplay = this.getErrorDisplay.bind(this);
    this.changeErrorDisplay = this.changeErrorDisplay.bind(this);
  }

  getError() {
    return this.props.errors && this.props.errors[this.props.property];
  }

  getErrorDisplay(property) {
    if (
      !this.props.errors ||
      !this.props.errors[this.props.property] ||
      !this.state.showErrorLabel
    )
      return null;
    const error = this.props.errors[this.props.property][0];
    return (
      <div style={{ position: "absolute", zIndex: 1 }}>
        <Transition transitionOnMount={true} animation="scale" duration={500}>
          <Label color="red" pointing>
            {errorDictionary[error]}
          </Label>
        </Transition>
      </div>
    );
  }

  changeErrorDisplay(showErrorLabel) {
    this.setState({ showErrorLabel });
  }

  render() {
    return (
      <Form.Field error={this.getError()}>
        <label>{this.props.label}</label>
        <input
          onMouseEnter={() => this.changeErrorDisplay(true)}
          onMouseLeave={() => this.changeErrorDisplay(false)}
          placeholder={this.props.label}
          name={this.props.property}
          onChange={this.props.updateState}
          value={this.props.value}
        />
        {this.getErrorDisplay()}
      </Form.Field>
    );
  }
}
