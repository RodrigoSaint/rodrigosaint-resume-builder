import React from "react";
import { Segment, Header, Container, Button, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

export default () => (
  <div>
    <Segment inverted style={{ minHeight: "100vh" }}>
      <Container text>
        <Header
          as="h1"
          content="Build your own Online Resume"
          inverted
          style={{
            fontSize: "3.25em",
            fontWeight: "normal",
            marginTop: "30vh"
          }}
        />
        <Header
          as="h2"
          content="Why delivery .docs or pdfs while you can serve your resume with up-to-date data with and with a simple link?"
          inverted
          style={{
            fontSize: "1.7em",
            fontWeight: "normal",
            marginTop: "1.5em"
          }}
        />
        <Link to="/signin">
          <Button primary size="huge">
            Get started
            <Icon name="right arrow" />
          </Button>
        </Link>
      </Container>
    </Segment>
  </div>
);
