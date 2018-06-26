import React from "react";
import { Menu, Icon, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { OUR_TALENT_LIST, SIGN_IN, LOGIN } from "../const/messages";

export default class CustomMenu extends React.Component {
  render() {
    return (
      <Menu inverted fixed="top">
        <Menu.Item>
          <Link to="/">
            <Icon circular name="id card" />
            <h2 style={{ display: "inline-block", margin: "0 10px" }}>
              Resume online
            </h2>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="talents">{OUR_TALENT_LIST}</Link>
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item>
            <Link to="/signin">{SIGN_IN}</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/login">
              <Button primary>
                <Icon name="linkedin square" />
                {LOGIN}
              </Button>
            </Link>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    );
  }
}
