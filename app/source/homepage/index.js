import React from "react";
import { Segment, Header, Container, Button, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { GET_STARTED, HOME_SUB_TITLE, HOME_TITLE } from "../const/messages";

export default () => (
  <div>
    <Segment inverted style={{ minHeight: "100vh" }}>
      <Container text>
        <Header
          as="h1"
          content={HOME_TITLE}
          inverted
          style={{
            fontSize: "3.25em",
            fontWeight: "normal",
            marginTop: "30vh"
          }}
        />
        <Header
          as="h2"
          content={HOME_SUB_TITLE}
          inverted
          style={{
            fontSize: "1.7em",
            fontWeight: "normal",
            marginTop: "1.5em"
          }}
        />
        <Link to="/signin">
          <Button primary size="huge">
            {GET_STARTED}
            <Icon name="right arrow" />
          </Button>
        </Link>
      </Container>
    </Segment>
  </div>
);
