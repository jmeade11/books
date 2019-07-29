import React, { Component } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { Redirect } from 'react-router-dom'
import Layout from '../common/Layout'
import BookForm from './BookForm'

class CreateBook extends Component {
  constructor (props) {
    super(props)

    this.state = {
      book: {
        title: '',
        author: '',
        firstPublished: '',
        originalLanguage: ''
      },
      createdBookId: null
    }
  }

  handleChange = event => {
    const updatedField = {
      [event.target.name]: event.target.value
    }
    const editedBook = Object.assign(this.state.book, updatedField)
    this.setState({ book: editedBook })
  }

  handleSubmit = event => {
    event.preventDefault()
    const formData = new FormData(event.target)
    axios({
      method: 'POST',
      url: `${apiUrl}/books`,
      contentType: false,
      processData: false,
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      },
      data: formData
    })
      .then(res => this.setState({ createdBookId: res.data.book._id }))
      .then(() => this.props.alert('Yippeee...', 'You created a new book', 'success'))
      .catch(() => this.props.alert('Ut oh...', 'That didn\'t work.  Try again.', 'danger'))
  }

  render () {
    const { createdBookId, book } = this.state

    if (createdBookId) {
      return <Redirect to={`/books/${createdBookId}`} />
    }

    return (
      <Layout md="8" lg="6">
        <BookForm
          bookId={''}
          book={book}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </Layout>
    )
  }
}

export default CreateBook
