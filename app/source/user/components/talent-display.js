import React from "react";
import axios from "axios";
import { Button, Card, Image, Divider } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { OUR_TALENT_LIST } from "../../const/messages";
import { mainEndpoint } from "../../const/endpoint";

export default class TalentDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userCollection: []
    };
    axios
      .get(`${mainEndpoint}/user`)
      .then(response => this.setState({ userCollection: response.data }));
  }

  render() {
    return (
      <div>
        <h2 className="route-title">{OUR_TALENT_LIST}</h2>
        <Divider />
        <Card.Group>
          {this.state.userCollection.map(user => (
            <Card>
              <Card.Content>
                <Image floated="right" size="mini" src={user.profilePicture} />
                <Card.Header>{user.name}</Card.Header>
                <Card.Description>{user.tagLine}</Card.Description>
              </Card.Content>
              <Card.Content extra>
                <Link to={`/resume/${user.nameOnUrl}`}>
                  <Button primary fluid>
                    Check {user.name.split(" ")[0]}'s Resume
                  </Button>
                </Link>
              </Card.Content>
            </Card>
          ))}
        </Card.Group>
      </div>
    );
  }
}
