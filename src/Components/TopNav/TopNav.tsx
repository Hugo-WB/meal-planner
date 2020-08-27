import React, { useState } from "react";
import { useFirestore } from "react-redux-firebase";
import { Menu, Button, Input, Modal, Icon, Form } from "semantic-ui-react";
import { Link, useLocation, useHistory } from "react-router-dom";
import * as firebase from "firebase/app";
import "firebase/auth";

import { Recipe } from "./../../reducers/interfaces";
import { useSelector } from "react-redux";
import { RootState } from "../../reducers/store";
interface Props {}
const AddRecipeModal = () => {
  const firestore = useFirestore();
  const history = useHistory();
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
    const imageExists = (url: string) => {
      var http = new XMLHttpRequest();
      http.open("HEAD", url, false);
      http.send();
      return http.status != 404;
    };

    let isValid = false;
    if (
      recipe.name.length > 0 &&
      recipe.description.length > 0 &&
      imageExists(recipe.imageSrc) &&
      recipe.steps.length > 0 &&
      recipe.ingredients.length > 0
    ) {
      isValid = true;
      firestore.collection("recipes").add(recipe);
      setOpen(false);
      history.push("/recipes");
    } else {
      alert("Invalid Data please try again");
    }
  };

  return (
    <Modal
      closeIcon
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={
        <Button color="olive" align="center">
          Add Recipe
        </Button>
      }
    >
      <Modal.Header align="center">Add New Recipe</Modal.Header>
      <Modal.Content scrolling>
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
  const location = useLocation();
  const links: string[] = ["dashboard", "plan", "recipes"];
  const history = useHistory();
  const Links = links.map((link) => (
    <Link to={"/" + link}>
      <Menu.Item link active={location.pathname == "/" + link}>
        {link.charAt(0).toUpperCase() + link.slice(1)}
      </Menu.Item>
    </Link>
  ));

  const signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        history.push("/");
      })
      .catch((error: any) => {
        alert(error.message);
      });
  };
  const user = useSelector((state: RootState) => state.localData.user);

  return (
    <div>
      <Menu color="teal" pointing secondary stackable>
        <Menu.Item>
          <img />
        </Menu.Item>
        {Links}
        <Menu.Menu position="right">
          <Menu.Item>
            <Input icon="search" placeholder="Search..." color="teal" />
          </Menu.Item>
          <Menu.Item>
            <AddRecipeModal />
          </Menu.Item>
          {/* <Menu.Item>
            {user==null ? <div /> : user.uid}
          </Menu.Item> */}
          <Menu.Item position="right">
            <Button color="red" align="center" onClick={signOut}>
              Sign Out
            </Button>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    </div>
  );
};

export default TopNav;
