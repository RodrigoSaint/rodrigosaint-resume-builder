import React from "react";
import { Form, Button } from "semantic-ui-react";
import GenericForm from "../../common/components/generic-form";

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
          <label>Github Username:</label>
          <input
            name="githubUsername"
            value={this.state.githubUsername}
            onChange={this.updateState}
          />
        </Form.Field>
        <Form.Field>
          <Button className="margin-top-default" onClick={this.add}>
            Add
          </Button>
        </Form.Field>
      </Form.Group>
    );
  }
}
