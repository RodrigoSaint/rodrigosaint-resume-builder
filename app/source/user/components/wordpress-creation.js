import React from "react";
import { Form, Button, Input, Icon } from "semantic-ui-react";
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
    if (!this.state.wordpressUrl) return;
    this.props.add(this.state.wordpressUrl);
    this.setState({ wordpressUrl: "" });
  }

  render() {
    return (
      <Form.Field>
        <label>Wordpress Url:</label>
        <Input>
          <input
            name="wordpressUrl"
            value={this.state.wordpressUrl}
            onChange={this.updateState}
          />
          <Button color="green" onClick={this.add}>
            <Icon name="add" />
            Add
          </Button>
        </Input>
      </Form.Field>
    );
  }
}
