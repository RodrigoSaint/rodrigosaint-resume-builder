import React from "react";
import axios from "axios";
import Github from "semantic-ui-github-components";
import Wordpress from "semantic-ui-wordpress-components";
import { Tab, Header, Image } from "semantic-ui-react";
import { mainEndpoint } from "../../const/endpoint";

const GithubSection = props => (
  <div>
    {props.githubUsernameCollection.map(username => (
      <Github key={username} username={username} />
    ))}
  </div>
);

const WordpressSection = props => (
  <div>
    {props.wordpressUrlCollection.map(address => (
      <Wordpress
        key={address}
        address={address.replace("https://", "").replace("http://", "")}
      />
    ))}
  </div>
);

export default class ResumeView extends React.Component {
  constructor(props) {
    super(props);
    axios
      .get(`${mainEndpoint}/user/${props.username}`)
      .then(result => this.setState(result.data))
      .catch(() => alert("User not found"));
    this.state = {
      name: "",
      tagLine: "",
      profilePicture: "",
      githubUsernameCollection: [],
      wordpressUrlCollection: []
    };
  }

  get paneCollection() {
    let paneCollection = [];
    if (this.state.wordpressUrlCollection.length)
      paneCollection.push({
        menuItem: {
          key: "Wordpress",
          content: "Wordpress",
          icon: "wordpress square"
        },
        render: () => (
          <WordpressSection
            wordpressUrlCollection={this.state.wordpressUrlCollection}
          />
        )
      });
    if (this.state.githubUsernameCollection.length)
      paneCollection.push({
        menuItem: {
          key: "Github",
          content: "Github",
          icon: "github square"
        },
        render: () => (
          <GithubSection
            githubUsernameCollection={this.state.githubUsernameCollection}
          />
        )
      });
    return paneCollection;
  }

  render() {
    return (
      <div>
        <Header as="h2">
          <Image circular src={this.state.profilePicture} />
          <Header.Content>
            {this.state.name}
            <Header.Subheader>{this.state.tagLine}</Header.Subheader>
          </Header.Content>
        </Header>
        <Tab
          menu={{ secondary: true, pointing: true }}
          panes={this.paneCollection}
        />
      </div>
    );
  }
}
