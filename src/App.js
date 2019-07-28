import React, { Component } from 'react'
import './App.scss'
import { Route } from 'react-router-dom'

import AuthenticatedRoute from './components/auth/AuthenticatedRoute'
import Header from './components/common/Header'
import SignUp from './components/auth/SignUp'
import SignIn from './components/auth/SignIn'
import SignOut from './components/auth/SignOut'
import ChangePassword from './components/auth/ChangePassword'
import Books from './components/books/Books'
import Book from './components/books/Book'
import CreateBook from './components/books/CreateBook'
import EditBook from './components/books/EditBook'
import AutoDismissAlert from './components/common/AutoDismissAlert'

class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      alerts: []
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  alert = (heading, message, variant) => {
    this.setState({ alerts: [...this.state.alerts, { heading, message, variant }] })
  }

  render () {
    const { alerts, user } = this.state

    return (
      <React.Fragment>
        <Header user={user} />
        <main className="container">
          <Route exact path="/" render={() => (
            <Books user={user} />
          )} />
          <Route exact path="/books" render={() => (
            <Books user={user} />
          )} />
          <Route exact path="/books/:id" render={() => (
            <Book user={user} alert={this.alert} />
          )} />
          <AuthenticatedRoute
            exact
            user={user}
            path="/books/:id/edit"
            render={() => <EditBook alert={this.alert} user={user} />}
          />
          <AuthenticatedRoute user={user} path="/createbook" render={() => (
            <CreateBook user={user} alert={this.alert} />
          )} />
          <Route path="/sign-up" render={() => (
            <SignUp alert={this.alert} setUser={this.setUser} />
          )} />
          <Route path="/sign-in" render={() => (
            <SignIn alert={this.alert} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} path="/sign-out" render={() => (
            <SignOut alert={this.alert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path="/change-password" render={() => (
            <ChangePassword alert={this.alert} user={user} />
          )} />
        </main>
        {alerts.map((alert, index) => (
          <AutoDismissAlert
            key={index}
            heading={alert.heading}
            variant={alert.variant}
            message={alert.message}
          />
        ))}
      </React.Fragment>
    )
  }
}

export default App
