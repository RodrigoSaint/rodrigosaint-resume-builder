import React from "react";
import { Menu, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

export default class CustomMenu extends React.Component {
  render() {
    return (
      <Menu inverted fixed="top">
        <Menu.Item>
          <Icon circular name="id card" />
          <h2 style={{ display: "inline-block", margin: "0 10px" }}>
            Resume online
          </h2>
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item>
            <Link to="/signin">Sign in</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/login">Login</Link>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    );
  }
}
