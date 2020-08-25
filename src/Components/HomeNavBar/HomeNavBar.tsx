import React,{Component} from "react";
import { Button, Visibility, Menu,Container } from "semantic-ui-react";
import { timeStamp } from "console";

export default class Navbar extends Component {
  state = {
    fixedMenu:false,
  }
  stickTop = () => {this.setState({fixedMenu:true})}
  unstickTop = () => {this.setState({fixedMenu:false})}

  render() {
    return (
    <div>
      <Visibility
        onTopPassed = {this.stickTop}
        onTopVisible = {this.unstickTop}
        once={false}
      >
        <Menu
          fixed = {this.state.fixedMenu ? "top": undefined}
          size = "large"
          inverted = {true} 
          pointing
          secondary
        >
          <Menu.Item as = "a" active>Home</Menu.Item>
          <Menu.Item as = "a">Test</Menu.Item>
          <Menu.Item position = "right">
            <Button>Sign In</Button>
          </Menu.Item>
        </Menu>
      </Visibility>
      <Container>
        
      </Container>
    </div>
    )
  }
}
