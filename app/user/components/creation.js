import React from "react";
import { Form } from "semantic-ui-react";
import Immutable from "immutable";
import axios from "axios";

import GenericForm from "../../common/components/generic-form";
import FullField from "../../common/components/full-field";
import DeletionList from "../../common/components/deletion-list";
import GithubCreation from "./github-creation";
import WordpressCreation from "./wordpress-creation";
import ErrorModal from "./error-modal";
import validateUser from "../validation";

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
        <ErrorModal
          toggleErrorModal={this.toggleErrorModal}
          showErrorModal={this.state.showErrorModal}
        />
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
