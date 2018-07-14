import * as React from 'react'
import { Navbar, Button } from 'react-bootstrap'
import './App.css'

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

    const authenticated = isAuthenticated()

    return (
      <div>
        <Navbar fluid>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#">Auth0 - React</a>
            </Navbar.Brand>
            <Button
              {...{
                bsStyle: 'primary',
                className: 'btn-margin',
                onClick: () => this.goTo.bind(this, 'home'),
                value: 'Home'
              }}
            />
            <Button
              {...{
                bsStyle: 'primary',
                className: 'btn-margin',
                onClick: () => (authenticated ? this.logout.bind(this) : this.login.bind(this)),
                value: authenticated ? 'Log Out' : 'Log In'
              }}
            />
          </Navbar.Header>
        </Navbar>
      </div>
    )
  }
}

export default App
