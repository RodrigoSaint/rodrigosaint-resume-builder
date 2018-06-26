import React from "react";
import { List } from "immutable";
import {
  Message,
  Header,
  Divider,
  Input,
  Button,
  Image
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

  createBotResponse(response) {
    const messageCollection = this.state.messageCollection.push({
      profilePicture: this.props.user.profilePicture,
      name: this.props.user.name,
      text: response
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

  render() {
    return (
      <div>
        <Header>Chatting with {this.firstname}'s bot</Header>
        <Divider />
        {this.state.messageCollection.map(message => (
          <ChatMessage {...message} />
        ))}
        <Divider />
        <Input fluid type="text" placeholder="Type your message" action>
          <input
            name="message"
            value={this.state.message}
            onInput={this.updateState}
          />
          <Button onClick={this.sendRequest}>Send</Button>
        </Input>
      </div>
    );
  }
}

export default Chat;