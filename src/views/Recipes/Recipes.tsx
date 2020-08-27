import React, { Component } from "react";
import { connect, useSelector } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";

import TopNav from "../../Components/TopNav/TopNav";
import RecipeCard from "../../Components/RecipeCard/RecipeCard";
import { Container, Grid, Rail, Modal, Button } from "semantic-ui-react";

import "./Recipes.css";

interface Props {}
interface State {}

const RecipeCards: React.FC = () => {
  useFirestoreConnect([{ collection: "recipes" }]);
  const recipes = useSelector((state: any) => state.firestore.ordered.recipes);
  if (recipes == undefined) {
    return <div></div>;
  } else {
    return recipes.map((recipe: any) => (
      <RecipeCard
        name={recipe.name}
        imageSrc={recipe.imageSrc}
        description={recipe.description}
        ingredients={recipe.ingredients}
      />
    ));
  }
};

const Recipes: React.FC<Props> = () => {
  return (
    <div>
      <TopNav />
      <Container style={{marginTop:'3em'}}>
        <Grid stackable centered veritcalAlign="middle">
          <RecipeCard
            name="test"
            imageSrc="http://lorempixel.com/1640/480"
            description="bruhdafja;fjajfafafadfafd"
            ingredients={["test", " test2"]}
          />
          <RecipeCards />

        </Grid>
        <div className="recipeGrid">
        </div>
      </Container>
    </div>
  );
};
const mapStateToProps = (state: any) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Recipes);
