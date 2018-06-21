import React from "react";
import {
  Form,
  Button,
  List,
  Icon,
  Modal,
  Message,
  Label,
  Popup,
  Transition
} from "semantic-ui-react";
import Immutable from "immutable";
import axios from "axios";
import { validate, isRequired } from "kaizen-validation";

function validateUser(user) {
  return validate(
    {
      name: [isRequired],
      nameOnUrl: [isRequired],
      profilePicture: [isRequired]
    },
    user
  );
}

class GenericForm extends React.Component {
  constructor(props) {
    super(props);
    this.updateState = this.updateState.bind(this);
  }

  updateState(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
}

const DeletionList = props => (
  <List>
    {props.collection.map(item => (
      <List.Item>
        <Icon
          link
          color="red"
          name="times"
          onClick={() => props.remove(item)}
        />
        {item}
      </List.Item>
    ))}
  </List>
);

class GithubCreation extends GenericForm {
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

class WordpressCreation extends GenericForm {
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

class FullField extends React.Component {
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
    return (
      <div style={{ position: "absolute", zIndex: 1 }}>
        <Transition transitionOnMount={true} animation="scale" duration={500}>
          <Label color="red" pointing>
            {this.props.errors[this.props.property][0]}
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

export default class UserCreation extends GenericForm {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      nameOnUrl: "",
      profilePicture: "",
      githubUsernameCollection: new Immutable.List(),
      wordpressUrlCollection: new Immutable.List(),
      errors: null,
      showErrorModal: false
    };
    this.addGithubUser = this.addGithubUser.bind(this);
    this.removeGithubUser = this.removeGithubUser.bind(this);
    this.addWordpressSite = this.addWordpressSite.bind(this);
    this.removeWordpressSite = this.removeWordpressSite.bind(this);
    this.save = this.save.bind(this);
    this.toggleErrorModal = this.toggleErrorModal.bind(this);
  }

  addGithubUser(githubUser) {
    this.setState({
      githubUsernameCollection: this.state.githubUsernameCollection.push(
        githubUser
      )
    });
  }

  addWordpressSite(wordpressSite) {
    this.setState({
      wordpressUrlCollection: this.state.wordpressUrlCollection.push(
        wordpressSite
      )
    });
  }

  removeGithubUser(githubUser) {
    this.setState({
      githubUsernameCollection: this.state.githubUsernameCollection.filter(
        username => username != githubUser
      )
    });
  }

  removeWordpressSite(wordpressSite) {
    this.setState({
      wordpressUrlCollection: this.state.wordpressUrlCollection.filter(
        url => wordpressSite != url
      )
    });
  }

  save() {
    let errors = validateUser(this.state);
    if (errors) {
      this.setState({ errors, showErrorModal: true });
      return;
    }
    axios
      .post("http://localhost:8000/user", this.state)
      .then(error => alert("Sucess"))
      .catch(error => console.dir(error));
  }

  toggleErrorModal() {
    this.setState({ showErrorModal: !this.state.showErrorModal });
  }

  render() {
    return (
      <Form>
        <Modal
          onClose={this.toggleErrorModal}
          closeOnEscape
          open={this.state.showErrorModal}
          dimmer="blurring"
        >
          <Modal.Header>Validation</Modal.Header>
          <Modal.Content>There are some invalid fields</Modal.Content>
          <Modal.Actions>
            <Button
              onClick={this.toggleErrorModal}
              positive
              labelPosition="right"
              icon="checkmark"
              content="Ok"
            />
          </Modal.Actions>
        </Modal>
        <Form.Group widths="equal">
          <FullField
            label="Name"
            property="name"
            errors={this.state.errors}
            updateState={this.updateState}
            value={this.state.name}
          />
          <FullField
            label="Url path"
            property="nameOnUrl"
            errors={this.state.errors}
            updateState={this.updateState}
            value={this.state.nameOnUrl}
          />
        </Form.Group>
        <Form.Group widths="equal">
          <FullField
            label="Profile Picture"
            property="profilePicture"
            errors={this.state.errors}
            updateState={this.updateState}
            value={this.state.profilePicture}
          />
        </Form.Group>
        <GithubCreation add={this.addGithubUser} />
        <DeletionList
          remove={this.removeGithubUser}
          collection={this.state.githubUsernameCollection}
        />
        <WordpressCreation add={this.addWordpressSite} />
        <DeletionList
          remove={this.removeWordpressSite}
          collection={this.state.wordpressUrlCollection}
        />
        <Form.Button onClick={this.save}>Create User</Form.Button>
      </Form>
    );
  }
}
