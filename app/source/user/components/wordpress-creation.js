import React from "react";
import { Form, Button } from "semantic-ui-react";
import GenericForm from "../../common/components/generic-form";

export default class WordpressCreation extends GenericForm {
  constructor(props) {
    super(props);
    this.state = {
      wordpressUrl: ""
    };
    this.add = this.add.bind(this);
  }

  add() {
    this.props.add(this.state.wordpressUrl);
    this.setState({ wordpressUrl: "" });
  }

  render() {
    return (
      <Form.Group widths="equal">
        <Form.Field>
          <label>Wordpress Url:</label>
          <input
            name="wordpressUrl"
            value={this.state.wordpressUrl}
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
