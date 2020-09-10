// Creates the popup for the recipes in the plan/calendar
import React, { useState, ReactElement, useEffect } from "react";
import {
  Card,
  Image,
  Modal,
  Header,
  List,
  Grid,
  Icon,
} from "semantic-ui-react";

interface Recipe {
  name: string;
  imageSrc: string;
  category?: string;
  description: string;
  ingredients: string[];
  steps: string;
  author: string;
}
interface Props{
  clicks:number,
  recipe:Recipe,
}

export default function RecipeCard(props: Props): ReactElement {
  const [showRecipe, setShowRecipe] = useState(true);
  const [showUser, setShowUser] = useState(false);
  useEffect(()=>{
    setShowRecipe(true)
  },[props.clicks])

  const Recipe = (
    <Modal open={showRecipe} closeIcon onClose={() => setShowRecipe(false)}>
      <Modal.Header>
        <Grid columns="equal" textAlign="center" container>
          <Grid.Column>{props.recipe.name}</Grid.Column>
          <Grid.Column textAlign="right">
            <p onClick={() => setShowUser(true)} style={{ cursor: "pointer" }}>
              {props.recipe.author}
            </p>
          </Grid.Column>
        </Grid>
      </Modal.Header>
      <Modal.Content image>
        <Image size="medium" src={props.recipe.imageSrc} />
        <Modal.Description>
          <Header>Ingredients:</Header>
          <List bulleted>
            {props.recipe.ingredients.map((ingredient) => (
              <List.Item>{ingredient}</List.Item>
            ))}
          </List>
          <Header>Steps:</Header>
          <p>{props.recipe.steps}</p>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );

  const User = (
    <Modal open={showUser} onClose={() => setShowUser(false)} closeIcon>
      <Modal.Header>{props.recipe.author}</Modal.Header>
    </Modal>
  );

  return (
    <div>
      {Recipe}
      {User}

    </div>
  );
}
