import React, { Component } from "react";
import { connect } from "react-redux";

import TopNav from "../../Components/TopNav/TopNav";
import RecipeCard from "../../Components/RecipeCard/RecipeCard";
import { Container, Grid, Rail, Modal, Button } from "semantic-ui-react";

import "./Recipes.css"

interface Props {}
interface State {}

export class Recipes extends Component<Props, State> {
  state = {};

  render() {
    return (
      <div>
        <TopNav />
        <Container>
          <div className = "recipeGrid">
            <RecipeCard
              name="test"
              imageSrc="http://lorempixel.com/1640/480"
              description="bruhdafja;fjajfafafadfafd"
              ingredients = {["test"," test2"]}
            />
            {/* <RecipeCard
              name="test"
              imageSrc="http://lorempixel.com/1640/480"
              description="bruhdafja;fjajfafafadfafd"
            />
            <RecipeCard
              name="test"
              imageSrc="http://lorempixel.com/1640/480"
              description="bruhdafja;fjajfafafadfafd"
            />
            <RecipeCard
              name="test"
              imageSrc="http://lorempixel.com/1640/480"
              description="bruhdafja;fjajfafafadfafd"
            />
            <RecipeCard
              name="test"
              imageSrc="http://lorempixel.com/1640/480"
              description="bruhdafja;fjajfafafadfafd"
            />
            <RecipeCard
              name="test"
              imageSrc="http://lorempixel.com/1640/480"
              description="bruhdafja;fjajfafafadfafd"
            />
            <RecipeCard
              name="test"
              imageSrc="http://lorempixel.com/1640/480"
              description="bruhdafja;fjajfafafadfafd"
            /> */}
          </div>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Recipes);
