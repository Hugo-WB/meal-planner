import React, { Component, useState } from "react";
import { Button, Visibility, Menu, Container } from "semantic-ui-react";
import { Link, useHistory } from "react-router-dom";

export default function HomeNavBar() {
  const [fixedMenu, setFixedMenu] = useState(false);
  const history = useHistory();

  return (
    <div>
      <Visibility
        onTopPassed={() => setFixedMenu(true)}
        onTopVisible={() => setFixedMenu(false)}
        once={false}
      >
        <Menu
          fixed={fixedMenu ? "top" : undefined}
          size="large"
          inverted={true}
          pointing
          secondary
        >
          <Menu.Item as="a" active>
            Home
          </Menu.Item>
          <Menu.Item as="a">
            <Link to="/dashboard">Test</Link>
          </Menu.Item>
          <Menu.Item position="right">
            <Button onClick={() => history.push("/authenticate")}>
              Sign In
            </Button>
          </Menu.Item>
        </Menu>
      </Visibility>
    </div>
  );
}
