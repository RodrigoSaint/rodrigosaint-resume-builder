import React from "react";
import { List } from "immutable";
import {
  Message,
  Header,
  Divider,
  Input,
  Button,
  Icon,
  Image,
  Form
} from "semantic-ui-react";
import axios from "axios";

import GenericForm from "../common/components/generic-form";
import { mainEndpoint } from "../const/endpoint";

const ChatMessage = props => (
  <Message>
    <Message.Header>
      <Image
        avatar
        floated="left"
        src={
          props.profilePicture ||
          "https://cdn4.iconfinder.com/data/icons/eldorado-user/40/user-512.png"
        }
      />

      {props.name}
    </Message.Header>
    {props.text}
  </Message>
);

class Chat extends GenericForm {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      messageCollection: new List()
    };
    this.sendRequest = this.sendRequest.bind(this);
  }

  get firstname() {
    return this.props.user ? this.props.user.name.split(" ")[0] : "";
  }

  prepareBotResponse(response) {
    return response.replace(/{username}/g, this.firstname);
  }

  createBotResponse(response) {
    const messageCollection = this.state.messageCollection.push({
      profilePicture: this.props.user.profilePicture,
      name: `${this.firstname}'s bot`,
      text: this.prepareBotResponse(response)
    });
    this.setState({ messageCollection });
  }

  sendRequest() {
    axios
      .post(`${mainEndpoint}/bot`, this.state.message, {
        headers: { "Content-Type": "text/plain" },
        responseType: "text"
      })
      .then(response => this.createBotResponse(response.data));

    const messageCollection = this.state.messageCollection.push({
      profilePicture: "",
      name: "Guest",
      text: this.state.message
    });
    this.setState({ messageCollection, message: "" });
  }

  get InfoMessage() {
    if (this.state.messageCollection && this.state.messageCollection.size > 0)
      return null;
    return (
      <Message info icon>
        <Icon name="info" />
        <Message.Content>
          <Message.Header>{`${this.firstname}'s chat bot`}</Message.Header>
          Here you can have a predefined chat experience with the user.
          <br />
          <strong>
            You can try saying hi or where do you work for exemple.
          </strong>
        </Message.Content>
      </Message>
    );
  }

  render() {
    return (
      <div>
        <Header>Chatting with {this.firstname}'s bot</Header>
        <Divider />
        {this.state.messageCollection.map(message => (
          <ChatMessage {...message} />
        ))}
        {this.InfoMessage}
        <Divider />
        <Form>
          <Input fluid type="text" placeholder="Type your message" action>
            <input
              name="message"
              value={this.state.message}
              onInput={this.updateState}
            />
            <Button type="submit" primary onClick={this.sendRequest}>
              <Icon name="send" />
              Send
            </Button>
          </Input>
        </Form>
      </div>
    );
  }
}

export default Chat;
