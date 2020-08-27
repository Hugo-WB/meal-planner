import React from "react";

import { Grid, Container, Form, Segment, Button,Header,Image, Icon } from "semantic-ui-react";

const Authenticate = () => {
  return (
    <div>
      <Grid textAlign="center" verticalAlign="middle" centered style={{height:"100vh"}}>
        <Grid.Column style={{maxWidth:"500px"}}>
          <Header textAlign="center" color="teal" size="huge" dividing style={{}}>
            <Icon name="food" size="huge" />
            Meal Planner
          </Header>
          <Form size="large">
            <Segment>
              <Form.Input fluid icon="user" iconPosition="left" placeholder="email"/>
              <Form.Input fluid icon="lock" type="password" placeholder="Password" iconPosition="left"/>
              <Button fluid color="teal">Sign In</Button>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default Authenticate;
