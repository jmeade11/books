import { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { signOut } from './api'
import messages from '../common/messages'

class SignOut extends Component {
  componentDidMount () {
    const { alert, history, clearUser, user } = this.props
    const { signOutSuccess } = messages

    signOut(user)
      .finally(() => alert(signOutSuccess.heading, signOutSuccess.message, 'success'))
      .finally(() => history.push('/'))
      .finally(() => clearUser())
  }

  render () {
    return ''
  }
}

export default withRouter(SignOut)
