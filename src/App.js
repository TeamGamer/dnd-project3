import * as React from 'react'
import { Navbar, Button } from 'react-bootstrap'
import './App.css'
import { getRandomRace } from './logic'
import {HttpRedirect} from './Components/httpRedirect'

class App extends React.Component {
  goTo(route) {
    this.props.history.replace(`/${route}`)
  }

  login() {
    this.props.auth.login()
  }

  logout() {
    this.props.auth.logout()
  }

  render() {
    const { isAuthenticated } = this.props.auth

    return (
      <div>
        <HttpRedirect />
        <Navbar fluid>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#">Auth0 - React</a>
            </Navbar.Brand>
            <Button
              {...{
                bsStyle: 'primary',
                className: 'btn-margin',
                onClick: () => this.goTo.bind(this, 'home')
              }}
            >
              Home
            </Button>
            {isAuthenticated() && (
              <Button onClick={this.logout.bind(this)} bsStyle="primary" className="btn-margin">
                Log Out
              </Button>
            )}
            {!isAuthenticated() && (
              <Button onClick={this.login.bind(this)} bsStyle="primary" className="btn-margin">
                Log In
              </Button>
            )}
            <Button
              {...{
                bsStyle: 'info',
                className: 'btn-margin',
                onClick: () => {
                  getRandomRace()
                }
              }}
            >
              Fetch Races
            </Button>
          </Navbar.Header>
        </Navbar>
      </div>
    )
  }
}

export default App
