import React from "react";
import { Form, Image, Button, List, Icon } from "semantic-ui-react";
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

export default class UserCreation extends GenericForm {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      nameOnUrl: "",
      profilePicture: "",
      githubUsernameCollection: new Immutable.List(),
      wordpressUrlCollection: new Immutable.List(),
      errors: null
    };
    this.addGithubUser = this.addGithubUser.bind(this);
    this.removeGithubUser = this.removeGithubUser.bind(this);
    this.addWordpressSite = this.addWordpressSite.bind(this);
    this.removeWordpressSite = this.removeWordpressSite.bind(this);
    this.save = this.save.bind(this);
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
      alert("There are some invalid fields");
      this.setState({ errors });
      console.log(errors);
      return;
    }
    axios
      .post("http://localhost:8000/user", this.state)
      .then(error => alert("Sucess"))
      .catch(error => console.dir(error));
  }

  getError(property) {
    return this.state.errors && this.state.errors.name;
  }

  render() {
    return (
      <Form>
        <Form.Group widths="equal">
          <Form.Input
            fluid
            label="Name"
            placeholder="Name"
            onChange={this.updateState}
            value={this.state.name}
            error={this.getError("name")}
          />
          <Form.Input
            fluid
            label="Url path"
            placeholder="Url path"
            onChange={this.updateState}
            value={this.state.nameOnUrl}
            error={this.getError("updateState")}
          />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Input
            fluid
            label="Profile Picture"
            placeholder="Profile Picture"
            name="profilePicture"
            onChange={this.updateState}
            value={this.state.profilePicture}
            error={this.getError("updateState")}
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
