import * as React from 'react'
import { Navbar } from 'react-bootstrap'
import './App.css'
import { getRandomRace } from './logic'
import { HttpRedirect } from './Components/httpRedirect'
import Jumbotron from './Components/Jumbotron'
import RandomBtn from './Components/RandomBtn'
import Header from './Components/Header'

class App extends React.Component {
  state = { currentCharacter: undefined }

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
    const { currentCharacter } = this.state

    return (
      <div>
        <HttpRedirect />
        <Navbar fluid>
          <Navbar.Header>
            <Navbar.Brand>
              <Header />
            </Navbar.Brand>
            {/* <RandomBtn
              {...{
                bsStyle: 'primary',
                className: 'btn-margin',
                onClick: () => this.goTo.bind(this, 'home')
              }}
            >
              Home
            </RandomBtn> */}
            {isAuthenticated() && (
              <RandomBtn onClick={this.logout.bind(this)} bsStyle="primary" className="btn-margin">
                Log Out
              </RandomBtn>
            )}
            {!isAuthenticated() && (
              <RandomBtn onClick={this.login.bind(this)} bsStyle="primary" className="btn-margin">
                Log In
              </RandomBtn>
            )}
            {isAuthenticated() && (
              <RandomBtn
                {...{
                  bsStyle: 'info',
                  className: 'btn-margin',
                  onClick: () => {
                    getRandomRace().then(currentCharacter => {
                      this.setState({ currentCharacter })
                    })
                  }
                }}
              >
                Generate Random Character
              </RandomBtn>
            )}
          </Navbar.Header>
        </Navbar>
        {currentCharacter && (
          <Jumbotron>
            <div>{currentCharacter.characterHP}</div>
            <div>{currentCharacter.characterGender}</div>
            <div>{currentCharacter.characterRace}</div>
            <div>{currentCharacter.characterSR}</div>
            <div>{currentCharacter.characterJob}</div>
            <div>{currentCharacter.characterAttr}</div>
            <div>{currentCharacter.characterProf}</div>
          </Jumbotron>
        )}
      </div>
    )
  }
}

export default App
