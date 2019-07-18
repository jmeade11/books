import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { changePassword } from '../api'
import messages from '../messages'

import Layout from '../../books/components/Layout'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class ChangePassword extends Component {
  constructor () {
    super()

    this.state = {
      oldPassword: '',
      newPassword: ''
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onChangePassword = event => {
    event.preventDefault()

    const { alert, history, user } = this.props

    changePassword(this.state, user)
      .then(() => alert(messages.changePasswordSuccess, 'success'))
      .then(() => history.push('/'))
      .catch(error => {
        console.error(error)
        this.setState({ oldPassword: '', newPassword: '' })
        alert(messages.changePasswordFailure, 'danger')
      })
  }

  render () {
    const { oldPassword, newPassword } = this.state

    return (
      <Layout md="8" lg="6">
        <Form onSubmit={this.onChangePassword}>
          <h3>Change Password</h3>
          <Form.Group controlId="oldPassword">
            <Form.Label>Old Password</Form.Label>
            <Form.Control
              required
              name="oldPassword"
              value={oldPassword}
              type="password"
              placeholder="Old Password"
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId="newPassword">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              required
              name="newPassword"
              value={newPassword}
              type="password"
              placeholder="New Password"
              onChange={this.handleChange}
            />
          </Form.Group>
          <Button type="submit">Change Password</Button>
        </Form>
      </Layout>
    )
  }
}

export default withRouter(ChangePassword)
