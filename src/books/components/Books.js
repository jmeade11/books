import React, { Component } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import ListGroup from 'react-bootstrap/ListGroup'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Layout from './Layout'

class Books extends Component {
  constructor (props) {
    super(props)
    this.state = {
      books: []
    }
  }

  componentDidMount () {
    axios(`${apiUrl}/books`)
      .then(res => this.setState({ books: res.data.books }))
      .catch(console.error)
  }

  render () {
    const { books } = this.state
    const { user } = this.props

    const bookArray = books.map(book => (
      <ListGroup.Item
        key={book._id}
        action
        as={Link}
        to={`/books/${book._id}`}
      >
        {book.title}
      </ListGroup.Item>
    ))

    return (
      <Layout md="8" lg="6">
        <h3 className="d-flex justify-content-between">Books {user && <Button href="#createbook">Add a Book</Button>}</h3>
        <ListGroup>
          {bookArray}
        </ListGroup>
      </Layout>
    )
  }
}

export default Books
