import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { signIn } from './api'
import messages from '../common/messages'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Layout from '../common/Layout'

class SignIn extends Component {
  constructor () {
    super()

    this.state = {
      email: '',
      password: ''
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onSignIn = event => {
    event.preventDefault()

    const { alert, history, setUser } = this.props
    const { signInSuccess, signInFailure } = messages

    signIn(this.state)
      .then(res => setUser(res.data.user))
      .then(() => alert(signInSuccess.heading, signInSuccess.message, 'success'))
      .then(() => history.push('/'))
      .catch(error => {
        console.error(error)
        this.setState({ email: '', password: '' })
        alert(signInFailure.heading, signInFailure.message, 'danger')
      })
  }

  render () {
    const { email, password } = this.state

    return (
      <Layout md="8" lg="6">
        <Form onSubmit={this.onSignIn}>
          <h3>Sign In</h3>
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
          <Button type="submit">Sign In</Button>
        </Form>
      </Layout>
    )
  }
}

export default withRouter(SignIn)
