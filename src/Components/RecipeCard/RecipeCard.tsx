import React, { useState, ReactElement } from "react";
import {
  Card,
  Image,
  Modal,
  Header,
  List,
  Grid,
  Icon,
} from "semantic-ui-react";

interface Props {
  name: string;
  imageSrc: string;
  category?: string;
  description: string;
  ingredients: string[];
  steps: string;
  author: string;
}

export default function RecipeCard(props: Props): ReactElement {
  const [showRecipe, setShowRecipe] = useState(false);
  const [showUser, setShowUser] = useState(false);

  const Recipe = (
    <Modal open={showRecipe} closeIcon onClose={() => setShowRecipe(false)}>
      <Modal.Header>
        <Grid columns="equal" textAlign="center" container>
          <Grid.Column>{props.name}</Grid.Column>
          <Grid.Column textAlign="right">
            <p onClick={() => setShowUser(true)} style={{ cursor: "pointer" }}>
              {props.author}
            </p>
          </Grid.Column>
        </Grid>
      </Modal.Header>
      <Modal.Content image>
        <Image size="medium" src={props.imageSrc} />
        <Modal.Description>
          <Header>Ingredients:</Header>
          <List bulleted>
            {props.ingredients.map((ingredient) => (
              <List.Item>{ingredient}</List.Item>
            ))}
          </List>
          <Header>Steps:</Header>
          <p>{props.steps}</p>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );

  const User = (
    <Modal open={showUser} onClose={() => setShowUser(false)} closeIcon>
      <Modal.Header>{props.author}</Modal.Header>
    </Modal>
  );

  return (
    <Card onClick={() => setShowRecipe(true)} style={{ margin: "20px" }}>
      <Image src={props.imageSrc} />
      <Card.Content>
        <Card.Header>{props.name}</Card.Header>
        <Card.Meta>{props.category}</Card.Meta>
        <Card.Description>{props.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Icon name="user" color="blue" />
        {props.author}
      </Card.Content>
      {Recipe}
      {User}
    </Card>
  );
}
