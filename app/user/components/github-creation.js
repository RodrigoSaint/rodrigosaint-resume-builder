import React from "react";
import { Form, Button } from "semantic-ui-react";
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
    this.props.add(this.state.githubUsername);
    this.setState({ githubUsername: "" });
  }

  render() {
    return (
      <Form.Group widths="equal">
        <Form.Field>
          <label>{GITHUB_USERNAME}:</label>
          <input
            name="githubUsername"
            value={this.state.githubUsername}
            onChange={this.updateState}
          />
        </Form.Field>
        <Form.Field>
          <Button className="margin-top-default" onClick={this.add}>
            {BUTTON_ADD}
          </Button>
        </Form.Field>
      </Form.Group>
    );
  }
}
