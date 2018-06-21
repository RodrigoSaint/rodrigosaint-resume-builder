import React from "react";

export default class GenericForm extends React.Component {
  constructor(props) {
    super(props);
    this.updateState = this.updateState.bind(this);
  }

  updateState(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
}
