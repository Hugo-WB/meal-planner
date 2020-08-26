import React, { useState } from "react";
import { useFirestore } from "react-redux-firebase";
import { Menu, Button, Input, Modal, Icon, Form } from "semantic-ui-react";
import { Link, useLocation } from "react-router-dom";

import { Recipe } from "./../../reducers/interfaces";
interface Props {}
const AddRecipeModal = () => {
  const firestore = useFirestore();
  const [open, setOpen] = useState(false); //For the Modal for creating a new recipe
  const [recipe, setRecipe] = useState<Recipe>({
    name: "",
    description: "",
    imageSrc: "",
    ingredients: [],
    steps: "",
  });
  const handleChange = (event: any) => {
    const name = event.target.name;
    let value = event.target.value;
    if (name === "ingredients") {
      value = value.split("\n");
    }
    setRecipe({
      ...recipe,
      [name]: value,
    });
    console.log(recipe);
  };
  const submit = () => {
    firestore.collection("recipes").add(recipe);
    setOpen(false);
  };

  return (
    <Modal
      closeIcon
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      // open = {true}
      open={open}
      trigger={<Button color="olive">Add Recipe</Button>}
    >
      <Modal.Header align="center">Add New Recipe</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Group widths="equal">
            <Form.Input
              fluid
              label="Recipe Name"
              placeholder="Pizza"
              onChange={handleChange}
              name="name"
            />
            <Form.Input
              fluid
              label="Description"
              placeholder="Italian Pizza"
              onChange={handleChange}
              name="description"
            />
          </Form.Group>
          <Form.Input
            label="Image link"
            placeholder="https://i.imgur.com/b00w470.jpg"
            onChange={handleChange}
            name="imageSrc"
          />
          <Form.TextArea
            label="Ingredients"
            placeholder={
              "60% Water \n100% Flour \nSalt \nYeast \nMozzarella \nTomato sauce"
            }
            onChange={handleChange}
            name="ingredients"
          />
          <Form.TextArea
            label="Steps"
            placeholder="bake"
            onChange={handleChange}
            name="steps"
          />
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button color="grey">
          <Icon name="eye" />
          Preview
        </Button>
        <Button color="green" onClick={submit}>
          <Icon name="check"></Icon>
          Submit
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

const TopNav = (props: Props) => {
  const firestore = useFirestore();
  const location = useLocation();
  const links:string[] = ["dashboard","plan","recipes"]
  const Links = links.map((link) => (
    <Link to = {"/"+link}>
      <Menu.Item link active={location.pathname == ("/"+link)}>{link.charAt(0).toUpperCase() + link.slice(1)}</Menu.Item>
    </Link>
  ))


  return (
    <div>
      <Menu color="teal" pointing secondary>
        <Menu.Item>
          <img />
        </Menu.Item>
        {Links}
        <Menu.Menu position="right">
          <Menu.Item>
            <Input icon="search" placeholder="Search..." />
          </Menu.Item>
          <Menu.Item>
            <AddRecipeModal />
          </Menu.Item>
          <Menu.Item position="right">
            <Button color="red">Sign Out</Button>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    </div>
  );
};

export default TopNav;
