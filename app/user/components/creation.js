import React from "react";
import { Form, Image, Button, Table } from "semantic-ui-react";

class GithubCreation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      githubUsername: ""
    };

    this.updateState = this.updateState.bind(this);
    this.add = this.add.bind(this);
  }

  updateState(event) {
    this.setState({ [event.target.name]: event.target.value });
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

const GithubList = props => (
  <Table>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell />
        <Table.HeaderCell />
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {props.githubUsernameCollection.map(username => (
        <Table.Row>
          <Table.Cell>{username}</Table.Cell>
          <Table.Cell>
            <Button onClick={() => props.remove(username)}>Exclude</Button>
          </Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  </Table>
);

export default class UserCreation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      profilePicture: "",
      githubUsernameCollection: [],
      wordpressUrlCollection: []
    };
    this.updateState = this.updateState.bind(this);
    this.addGithubUser = this.addGithubUser.bind(this);
    this.removeGithubUser = this.removeGithubUser.bind(this);
  }

  updateState(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  addGithubUser(githubUser) {
    this.setState({
      githubUsernameCollection: [
        ...this.state.githubUsernameCollection,
        githubUser
      ]
    });
  }

  removeGithubUser(githubUser) {
    const githubUsernameCollection = this.state.githubUsernameCollection.filter(
      username => username != githubUser
    );
    this.setState({
      githubUsernameCollection
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
        <GithubList
          remove={this.removeGithubUser}
          githubUsernameCollection={this.state.githubUsernameCollection}
        />
      </Form>
    );
  }
}
