import React, { Component } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Redirect } from 'react-router-dom'
import Layout from './Layout'

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

    axios({
      url: `${apiUrl}/books`,
      method: 'POST',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      },
      data: { book: this.state.book }
    })
      .then(res => this.setState({ createdBookId: res.data.book._id }))
      .then(() => this.props.alert('You created a new book', 'warning'))
      .catch(console.error)
  }

  render () {
    const { createdBookId, book } = this.state

    if (createdBookId) {
      return <Redirect to={`/books/${createdBookId}`} />
    }

    return (
      <Layout md="8" lg="6">
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="title">
            <Form.Label>Book Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Title"
              name="title"
              onChange={this.handleChange}
              value={book.title}
            />
          </Form.Group>
          <Form.Group controlId="author">
            <Form.Label>Book Author</Form.Label>
            <Form.Control
              type="text"
              placeholder="Author"
              name="author"
              onChange={this.handleChange}
              value={book.author}
            />
          </Form.Group>
          <Form.Group controlId="originalLanguage">
            <Form.Label>Book Author</Form.Label>
            <Form.Control
              type="text"
              placeholder="Original Language"
              name="originalLanguage"
              onChange={this.handleChange}
              value={book.originalLanguage}
            />
          </Form.Group>
          <Form.Group controlId="firstPublished">
            <Form.Label>Book Author</Form.Label>
            <Form.Control
              type="date"
              placeholder="Author"
              name="firstPublished"
              onChange={this.handleChange}
              value={book.firstPublished}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Layout>
    )
  }
}

export default CreateBook
