import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import apiUrl from '../../apiConfig'
import axios from 'axios'
import { withRouter } from 'react-router-dom'

class EditBook extends Component {
  constructor (props) {
    super(props)

    this.state = {
      book: {
        _id: '',
        title: '',
        author: '',
        firstPublished: '',
        originalLanguage: ''
      }
    }
  }

  componentDidMount () {
    axios(`${apiUrl}/books/${this.props.match.params.id}`)
      .then(res => {
        const dateObj = new Date(res.data.book.firstPublished)
        const formattedDate = dateObj.toISOString().substring(0, 10)
        this.setState({
          book: {
            ...res.data.book,
            firstPublished: formattedDate
          }
        })
      })
      .catch(console.error)
  }

  handleChange = event => (
    this.setState({
      book: {
        ...this.state.book,
        [event.target.name]: event.target.value
      }
    })
  )

  handleSubmit = event => {
    event.preventDefault()

    axios({
      url: `${apiUrl}/books/${this.props.match.params.id}`,
      method: 'PATCH',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      },
      data: { book: this.state.book }
    })
      .then(() => this.props.history.push(`/books/${this.state.book._id}`))
      .then(() => this.props.alert('Awesome! You edited a book.', 'success'))
      .catch(() => this.props.alert('You are not Awesome.  It didn\'t work', 'danger'))
  }

  render () {
    const { book } = this.state

    return (
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
        <Form.Group controlId="firstPublished">
          <Form.Label>First Published</Form.Label>
          <Form.Control
            type="date"
            name="firstPublished"
            onChange={this.handleChange}
            value={book.firstPublished}
          />
        </Form.Group>
        <Form.Group controlId="originalLanguage">
          <Form.Label>Original Language</Form.Label>
          <Form.Control
            type="text"
            placeholder="original language"
            name="originalLanguage"
            onChange={this.handleChange}
            value={book.originalLanguage}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    )
  }
}

export default withRouter(EditBook)
