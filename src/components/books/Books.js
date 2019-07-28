import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import Layout from '../common/Layout'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'
// import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'

class Books extends Component {
  constructor (props) {
    super(props)
    this.state = {
      books: [],
      displayBooksList: [],
      filtered: false,
      sorted: false
    }
  }

  componentDidMount () {
    axios(`${apiUrl}/books`)
      .then(res => this.setState({ books: res.data.books, displayBooksList: res.data.books }))
      .catch(console.error)
  }

  handleSort = event => {
    const { books, sorted } = this.state
    const sortedBookArray = sorted ? [...books.sort((a, b) => (a.title > b.title) ? 1 : -1)] : [...books.sort((a, b) => (a.title < b.title) ? 1 : -1)]
    this.setState({ displayBooksList: sortedBookArray, sorted: !sorted })
  }

  handleFilter = event => {
    event.preventDefault()
    this.setState({ filtered: !this.state.filtered })
  }

  handleChange = event => {
    const searchString = event.target.value.toLowerCase()
    const queryLength = searchString.length
    const prevQueryLength = this.state.queryLength || 0
    const books = queryLength > prevQueryLength ? this.state.displayBooksList : this.state.books

    const searchResults = books.filter(book => book.title.toLowerCase().includes(searchString))

    this.setState({ displayBooksList: searchResults, queryLength: queryLength })
  }

  render () {
    const { displayBooksList, filtered, sorted } = this.state
    const { user } = this.props

    const bookArray = displayBooksList.map(book => (
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
      <Layout md="12" lg="8">
        <div className="d-flex justify-content-between mb-2">
          <h3>Books</h3>
          <div className="flex-grow-1 d-flex align-items-center justify-content-end">
            { user &&
              <Fragment>
                <FormControl
                  placeholder="Search"
                  aria-label="Search"
                  onChange={this.handleChange}
                  className="border-secondary d-inline mx-lg-5 mx-md-3 mx-1"
                />
                <Button variant="outline-secondary" href="#createbook" className="mr-md-2 mr-1">
                  <i className="icofont-ui-add" />
                </Button>
                <Button variant={filtered ? 'outline-primary' : 'outline-secondary'} onClick={this.handleFilter} className="mr-md-2 mr-1">
                  <i className="icofont-filter" />
                </Button>
              </Fragment>
            }
            <Button variant={sorted ? 'outline-primary' : 'outline-secondary'} onClick={this.handleSort}>
              <i className="icofont-sort" />
            </Button>
          </div>
        </div>
        <ListGroup>
          {bookArray}
        </ListGroup>
      </Layout>
    )
  }
}

export default Books
