import React from "react";
import { Form, Image, Button, List, Icon } from "semantic-ui-react";
import Immutable from "immutable";

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
        <Form.Button onClick={this.add}>Add</Form.Button>
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
        <Form.Button onClick={this.add}>Add</Form.Button>
      </Form.Group>
    );
  }
}

export default class UserCreation extends GenericForm {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      profilePicture: "",
      githubUsernameCollection: new Immutable.List(),
      wordpressUrlCollection: new Immutable.List()
    };
    this.addGithubUser = this.addGithubUser.bind(this);
    this.removeGithubUser = this.removeGithubUser.bind(this);
    this.addWordpressSite = this.addWordpressSite.bind(this);
    this.removeWordpressSite = this.removeWordpressSite.bind(this);
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

  render() {
    return (
      <Form>
        <Form.Group widths="equal">
          <Form.Field>
            <label>Name: </label>
            <input
              name="name"
              onChange={this.updateState}
              value={this.state.name}
            />
          </Form.Field>
          <Form.Field>
            <label>Profile picture: </label>
            <input
              name="profilePicture"
              onChange={this.updateState}
              value={this.state.profilePicture}
            />
          </Form.Field>
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
      </Form>
    );
  }
}
