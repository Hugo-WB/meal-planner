import React, { useEffect } from "react";
import {
  Button,
  Header,
  Container,
  Segment,
  Grid,
  Image,
} from "semantic-ui-react";
import NavBar from "../../Components/HomeNavBar/HomeNavBar";

import "./Homepage.css";

export default function Homepage() {
  useEffect(() => {
    console.log("test");
  });

  return (
    <div>
      <Segment inverted>
        <NavBar />
        <Container text className="headerContainer">
          <Header
            inverted
            content="Meal Planner"
            textAlign="center"
            size="huge"
          />
        </Container>
      </Segment>
      <Segment id = "informationSegment">
        <Grid centerd container stackable>
          <Grid.Row columns="equal" textAlign="center">
            <Grid.Column width={10}>
              <Header size = "huge">
                Save Recipes
              </Header>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non
                reprehenderit possimus sunt dolorem, tenetur, quasi commodi
                obcaecati vitae repudiandae, facere porro harum! Optio, ipsam
                eligendi ad eum recusandae ullam a?
              </p>
            </Grid.Column>
            <Grid.Column floated="right">
              <Image />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </div>
  );
}