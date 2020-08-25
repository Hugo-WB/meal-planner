import React, { Component } from "react";
import { connect,useSelector } from "react-redux";
import {useFirestoreConnect} from "react-redux-firebase"

import TopNav from "../../Components/TopNav/TopNav";
import RecipeCard from "../../Components/RecipeCard/RecipeCard";
import { Container, Grid, Rail, Modal, Button } from "semantic-ui-react";

import "./Recipes.css"

interface Props {}
interface State {}

const Recipes: React.FC<Props> = () =>{
    useFirestoreConnect([{collection:"recipes"}])
    const recipes = useSelector((state:any) => state.firestore.ordered.recipes)
    console.log(recipes)
    console.log(typeof recipes)
    // const recipeCards = recipes.map((recipe:any)=>{console.log(recipe.name)})
    // const recipeCards = () =>{
    //   recipes.map((recipe:any) =>  
    //   //  MAKE THE RECIPE TYPED INTERFACE
    //     <RecipeCard
    //       name={recipe.name}
    //       imageSrc={recipe.imageSrc}
    //       description={recipe.description}
    //       ingredients = {recipe.Ingredients}
    //     />
    //   )
    // }
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
            {/* {recipedCards} */}
          </div>
        </Container>
      </div>
    );

}
const mapStateToProps = (state: any) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Recipes);

