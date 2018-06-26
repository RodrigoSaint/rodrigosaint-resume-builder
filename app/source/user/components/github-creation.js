import React from "react";
import { Form, Button, Input, Icon } from "semantic-ui-react";
import GenericForm from "../../common/components/generic-form";
import { GITHUB_USERNAME, BUTTON_ADD } from "../../const/messages";

export default class GithubCreation extends GenericForm {
  constructor(props) {
    super(props);
    this.state = {
      githubUsername: ""
    };

    this.add = this.add.bind(this);
  }

  add() {
    debugger;
    if (!this.state.githubUsername) return;
    this.props.add(this.state.githubUsername);
    this.setState({ githubUsername: "" });
  }

  render() {
    return (
      <Form.Field>
        <label>{GITHUB_USERNAME}:</label>
        <Input>
          <input
            name="githubUsername"
            value={this.state.githubUsername}
            onChange={this.updateState}
          />
          <Button color="green" onClick={this.add}>
            <Icon name="add" /> {BUTTON_ADD}
          </Button>
        </Input>
      </Form.Field>
    );
  }
}
