import React, { Component } from "react";
import { Card, Image, Modal, Header, List } from "semantic-ui-react";

interface Props {
  name: string;
  imageSrc: string;
  category?: string;
  description: string;
  ingredients: string[];
  steps?: string;
}

interface State {
  showModal: boolean;
}

export default class RecipeCard extends Component<Props, State> {
  state = {
    showModal: false,
  };
  switchModal = () => {
    this.setState({
      showModal: !this.state.showModal,
    });
  };

  render() {
    return (
      <div>
        <Card onClick={this.switchModal}>
          <Image src={this.props.imageSrc} />
          <Card.Content>
            <Card.Header>{this.props.name}</Card.Header>
            <Card.Meta>{this.props.category}</Card.Meta>
            <Card.Description>{this.props.description}</Card.Description>
          </Card.Content>
        </Card>
        <Modal open={this.state.showModal} closeIcon onClose={this.switchModal}>
          <Modal.Header>{this.props.name}</Modal.Header>
          <Modal.Content image>
            <Image size="medium" src={this.props.imageSrc} />
            <Modal.Description>
              <Header>Ingredients:</Header>
              <List bulleted>
                {this.props.ingredients.map((ingredient) => (
                  <List.Item>{ingredient}</List.Item>
                ))}
              </List>
              <Header>Steps:</Header>
              <p>{this.props.steps}</p>
            </Modal.Description>
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}
