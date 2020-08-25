import React, { Component } from 'react'
import { Menu, Button, Input } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

export default class Topnav extends Component {
  render() {
    return (
      <div>
        <Menu color = "teal" pointing secondary>
          <Menu.Item>
            <img />
          </Menu.Item>
          <Link to="/dashboard" >
            <Menu.Item link active = {true}>Dashboard</Menu.Item>
          </Link>
          <Link to="/plan">
            <Menu.Item link>Plan</Menu.Item>
          </Link>
          <Link to="/recipes">
            <Menu.Item link>Recipes</Menu.Item>
          </Link>
          <Menu.Menu position="right">
            <Menu.Item>
              <Input icon='search' placeholder='Search...' />
            </Menu.Item>
            <Menu.Item>
              <Button>Add Recipe</Button>
            </Menu.Item>
            <Menu.Item position="right">
              <Button>Sign Out</Button>
            </Menu.Item>
          </Menu.Menu>
        </Menu>
        
      </div>
    )
  }
}
