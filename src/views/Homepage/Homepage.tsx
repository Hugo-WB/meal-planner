import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import anime from "animejs";

// CSS:
import {
  Button,
  Header,
  Container,
  Segment,
  Grid,
  Image,
  Icon,
  Ref,
  Visibility,
} from "semantic-ui-react";
import "./Homepage.css";

import FullLogo from "../../Components/Logos/FullLogo";
import rectangleLogo from "../../assets/rectangleLogo.png";
import recipes from "../../assets/recipes.png";
import plan from "../../assets/plan.png";

export default function Homepage() {
  const history = useHistory();

  useEffect(() => {
    anime({
      targets: "#startButton",
      duration: 5500,
      scale: 2,
    });
  });

  return (
    <div>
      <Segment
        textAlign="center"
        vertical
        style={{
          width: "100vw",
          height: "100vh",
          backgroundColor: "white",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <Container text style={{ marginTop: "15vh" }}>
          <Container style={{ maxWidth: "100px" }}>
            <FullLogo />
          </Container>
          <Button
            onClick={() => history.push("/authenticate")}
            size="medium"
            style={{ marginTop: "10vh" }}
            labelPosition="right"
            icon
            color="teal"
            id="startButton"
            onMouseEnter={() =>
              anime({ targets: "#startButton", scale: 2.1, translateY: -2 })
            }
            onMouseLeave={() =>
              anime({
                targets: "#startButton",
                scale: 2,
                translateY: 2,
              })
            }
          >
            Start
            <Icon name="arrow right" />
          </Button>
        </Container>
      </Segment>

      <Segment id="informationSegment">
        <Grid centerd container stackable verticalAlign="middle">
          <Visibility
            onTopVisible={() =>
              anime({
                targets: "#firstRow",
                translateX: ["800px", "0px"],
                duration: 4000,
              })
            }
          />
          <Grid.Row columns="equal" textAlign="center" id="firstRow">
            <Grid.Column width={3}>
              <Header size="huge">More than 50 Recipes</Header>
              <p>Scraped from the top cooking websites.</p>
            </Grid.Column>
            <Grid.Column>
              <Image src={recipes} />
            </Grid.Column>
          </Grid.Row>

          <Visibility
            onTopVisible={() =>
              anime({
                targets: "#secondRow",
                translateX: ["-1000px", "0px"],
                duration: 4000,
              })
            }
          />
          <Grid.Row columns="equal" textAlign="center" id="secondRow">
            <Grid.Column>
              <Image src={plan} />
            </Grid.Column>
            <Grid.Column width={3}>
              <Header size="huge">Bespoke weekly plans</Header>
              <p>Automatically Generated according to your preferences</p>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" textAlign="center" id="thirdRow">
            <Grid.Column>
              <Button
                size="huge"
                icon
                labelPosition="left"
                href="https://github.com/Hugo-WB/meal-planner"
              >
                Source Code
                <Icon name="github"></Icon>
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </div>
  );
}
