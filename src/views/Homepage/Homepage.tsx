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

import FullLogo from "../../Components/Logos/FullLogo"
import rectangleLogo from "../../assets/rectangleLogo.png";
import recipes from "../../assets/recipes.png";

export default function Homepage() {
  const history = useHistory();
  const buttonRef = React.useRef(null);

  useEffect(() => {
    anime({
      targets: buttonRef.current,
      duration: 5500,
      scale: 2,
    });
  });

  const moveButton = () => {
    anime({ targets: buttonRef.current, duration: 2000, bottom: "0px" });
  };

  return (
    <div>
      <Segment
        textAlign="center"
        vertical
        style={{
          width: "100vw",
          height: "100vh",
          backgroundColor: "white",
          // backgroundImage:
          //   "url(" + "http://lorempixel.com/1920/1080/food/" + ")",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <Container text style={{ marginTop: "15vh" }}>
          <Container style={{maxWidth:"100px"}}>
            <FullLogo/>
          </Container>
          <Visibility onTopPassed={() => console.log("")}>
            <Ref innerRef={buttonRef}>
              <Button
                onClick={() => history.push("/authenticate")}
                size="medium"
                style={{ marginTop: "10vh" }}
                labelPosition="right"
                icon
                color="teal"
                onMouseEnter={() => anime({ targets: buttonRef.current, scale: 2.05 })}
                onMouseLeave={() => anime({ targets: buttonRef.current, scale: 2 })}
                
              >
                Sign In
                <Icon name="arrow right" />
              </Button>
            </Ref>
          </Visibility>
        </Container>
      </Segment>

      <Segment id="informationSegment">
        <Grid centerd container stackable verticalAlign="middle">
          <Visibility onTopVisible={()=>anime({targets:"#firstRow",translateX:["800px","0px"],duration:4000})} />
            <Grid.Row columns="equal" textAlign="center" id="firstRow">
              <Grid.Column width={3}>
                <Header size="huge">More than 50 Recipes</Header>
                <p>Scraped from the top cooking websites.</p>
              </Grid.Column>
              <Grid.Column>
                <Image src={recipes} />
              </Grid.Column>
            </Grid.Row>

          <Visibility onTopVisible={()=>anime({targets:"#secondRow",translateX:["-1000px","0px"],duration:4000})} />
          <Grid.Row columns="equal" textAlign="center" id="secondRow">
            <Grid.Column>
              <Image />
            </Grid.Column>
            <Grid.Column width={3}>
              <Header size="huge">Bespoke weekly plans</Header>
              <p>Automatically Generated according to your preferences</p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </div>
  );
}
