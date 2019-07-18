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
      books: [],
      filtered: false,
      sorted: false
    }
  }

  componentDidMount () {
    axios(`${apiUrl}/books`)
      .then(res => this.setState({ books: res.data.books }))
      .catch(console.error)
  }

  handleSort = event => {
    event.preventDefault()
    this.setState({ books: this.state.books.reverse(), sorted: !this.state.sorted })
  }

  handleFilter = event => {
    event.preventDefault()
    this.setState({ filtered: !this.state.filtered })
  }

  render () {
    const { books, filtered, sorted } = this.state
    const { user } = this.props

    const bookArray = books.map(book => (
      <ListGroup.Item
        className={filtered && !(user._id === book.owner) ? 'd-none' : ''}
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
        <div className="d-flex justify-content-between mb-2">
          <h3>Books</h3>
          {
            user ? (
              <div>
                <Button variant="outline-secondary" href="#createbook" className="mr-2">
                  <i className="icofont-ui-add"></i>
                </Button>
                <Button variant={filtered ? 'outline-primary' : 'outline-secondary'} onClick={this.handleFilter} className="mr-2">
                  <i className="icofont-filter"></i>
                </Button>
                <Button variant={sorted ? 'outline-primary' : 'outline-secondary'} onClick={this.handleSort}>
                  <i className="icofont-sort"></i>
                </Button>
              </div>
            ) : (
              <Button variant={sorted ? 'outline-primary' : 'outline-secondary'} onClick={this.handleSort}>
                <i className="icofont-sort"></i>
              </Button>
            )
          }
        </div>
        <ListGroup>
          {bookArray}
        </ListGroup>
      </Layout>
    )
  }
}

export default Books
