import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { signUp, signIn } from './api'
import messages from '../common/messages'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import Layout from '../common/Layout'

class SignUp extends Component {
  constructor () {
    super()

    this.state = {
      username: '',
      email: '',
      password: '',
      passwordConfirmation: ''
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onSignUp = event => {
    event.preventDefault()

    const { alert, history, setUser } = this.props
    const { signUpSuccess, signUpFailure } = messages

    signUp(this.state)
      .then(() => signIn(this.state))
      .then(res => setUser(res.data.user))
      .then(() => alert(signUpSuccess.heading, signUpSuccess.message, 'success'))
      .then(() => history.push('/'))
      .catch(error => {
        console.error(error)
        this.setState({ username: '', email: '', password: '', passwordConfirmation: '' })
        alert(signUpFailure.heading, signUpFailure.message, 'danger')
      })
  }

  render () {
    const { email, password, passwordConfirmation, username } = this.state

    return (
      <Layout md="8" lg="6">
        <Form onSubmit={this.onSignUp}>
          <h3>Sign Up</h3>
          <Form.Group controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              required
              type="username"
              name="username"
              value={username}
              placeholder="Username"
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              required
              type="email"
              name="email"
              value={email}
              placeholder="Email"
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              name="password"
              value={password}
              type="password"
              placeholder="Password"
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId="passwordConfirmation">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              required
              name="passwordConfirmation"
              value={passwordConfirmation}
              type="password"
              placeholder="Confirm Password"
              onChange={this.handleChange}
            />
          </Form.Group>
          <Button type="submit">Sign In</Button>
        </Form>
      </Layout>
    )
  }
}

export default withRouter(SignUp)
