import * as React from 'react'
import { Navbar } from 'react-bootstrap'
import './App.css'
import { getRandomRace } from './logic'
import { HttpRedirect } from './Components/httpRedirect'
import RandomBtn from './Components/RandomBtn'
import Header from './Components/Header'
import { Row, Card, CardBody, CardTitle, CardSubtitle, CardText, Col } from 'reactstrap'

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
        <Row>
          <Col sm="8" className="offset-2">
            <Col sm="6" className="offset-3">
              {currentCharacter && (
                <Card>
                  <CardBody>
                    <CardTitle>
                      {currentCharacter.characterGender} {currentCharacter.characterRace}
                    </CardTitle>
                    <CardSubtitle>{currentCharacter.characterJob}</CardSubtitle>
                  </CardBody>
                  <img
                    width="100%"
                    src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180"
                    alt="Character"
                  />
                  <CardBody>
                    <Row>
                    <Col s="6">
                    <CardText>HP: {currentCharacter.characterHP}</CardText>
                    <CardText>Strength: {currentCharacter.characterAttr[0]}</CardText>
                    <CardText>Dexterity: {currentCharacter.characterAttr[1]}</CardText>
                    <CardText>Constitution: {currentCharacter.characterAttr[2]}</CardText>
                    <CardText>Inteligence: {currentCharacter.characterAttr[3]}</CardText>
                    <CardText>Wisdom: {currentCharacter.characterAttr[4]}</CardText>
                    <CardText>Charisma: {currentCharacter.characterAttr[5]}</CardText>
                    </Col>
                    <Col s="6">
                    <CardText>
                      Proficiencies:
                      <ul>
                        {currentCharacter.characterProf.map(function(name, index) {
                          return <li key={index}>{name}</li>
                        })}
                      </ul>
                    </CardText>
                    </Col>
                    </Row>
                  </CardBody>
                </Card>
              )}
            </Col>
          </Col>
        </Row>
      </div>
    )
  }
}

export default App
