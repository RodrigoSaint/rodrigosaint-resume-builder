import React from "react";
import { Form, Icon, Divider } from "semantic-ui-react";
import Immutable from "immutable";
import axios from "axios";

import GenericForm from "../../common/components/generic-form";
import FullField from "../../common/components/full-field";
import DeletionList from "../../common/components/deletion-list";
import GithubCreation from "./github-creation";
import WordpressCreation from "./wordpress-creation";
import ErrorModal from "./error-modal";
import validateUser from "../validation";
import {
  USER_CREATE_TITLE,
  USER_UPDATE_TITLE,
  USER_LABEL_NAME,
  USER_LABEL_NAME_ON_URL,
  USER_LABEL_PROFILE_PICTURE,
  USER_LABEL_TAG_LINE,
  BUTTON_SAVE
} from "../../const/messages";
import { mainEndpoint } from "../../const/endpoint";

export default class UserCreation extends GenericForm {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      nameOnUrl: "",
      tagLine: "",
      profilePicture: "",
      githubUsernameCollection: new Immutable.List(),
      wordpressUrlCollection: new Immutable.List(),
      errors: null,
      showErrorModal: false
    };

    if (this.props.username)
      axios
        .get(`${mainEndpoint}/user/${this.props.username}`)
        .then(response => this.setState({ ...response.data }));

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

    const request =
      undefined == this.props.username
        ? axios.post(`${mainEndpoint}/user`, this.state)
        : axios.put(`${mainEndpoint}/user/${this.props.username}`, this.state);

    request.then(() => alert("Sucess")).catch(error => console.dir(error));
  }

  toggleErrorModal() {
    this.setState({ showErrorModal: !this.state.showErrorModal });
  }

  render() {
    return (
      <Form>
        <h2 className="route-title">
          {this.props.username ? USER_UPDATE_TITLE : USER_CREATE_TITLE}
        </h2>
        <Divider />
        <ErrorModal
          toggleErrorModal={this.toggleErrorModal}
          showErrorModal={this.state.showErrorModal}
        />
        <Form.Group widths="equal">
          <FullField
            label={USER_LABEL_NAME}
            property="name"
            errors={this.state.errors}
            updateState={this.updateState}
            value={this.state.name}
          />
          <FullField
            label={USER_LABEL_NAME_ON_URL}
            property="nameOnUrl"
            errors={this.state.errors}
            updateState={this.updateState}
            value={this.state.nameOnUrl}
          />
        </Form.Group>
        <Form.Group widths="equal">
          <FullField
            label={USER_LABEL_PROFILE_PICTURE}
            property="profilePicture"
            errors={this.state.errors}
            updateState={this.updateState}
            value={this.state.profilePicture}
          />
          <FullField
            label={USER_LABEL_TAG_LINE}
            property="tagLine"
            errors={this.state.errors}
            updateState={this.updateState}
            value={this.state.tagLine}
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
        <Form.Button primary onClick={this.save}>
          <Icon name="save" />
          {BUTTON_SAVE}
        </Form.Button>
      </Form>
    );
  }
}
