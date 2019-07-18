import React, { Component } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { Link, withRouter } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Layout from './Layout'

class Book extends Component {
  constructor (props) {
    super(props)
    this.state = {
      book: {
        title: '',
        author: '',
        owner: '',
        firstPublished: '',
        originalLanguage: ''
      }
    }
  }

  componentDidMount () {
    axios(`${apiUrl}/books/${this.props.match.params.id}`)
      .then(res => {
        const options = {
          month: 'long',
          day: 'numeric',
          year: 'numeric'
        }
        const dateObj = new Date(res.data.book.firstPublished)
        const formattedDate = dateObj.toLocaleDateString(undefined, options)
        console.log(res.data.book)
        this.setState({
          book: {
            ...res.data.book,
            firstPublished: formattedDate
          }
        })
      })
      .catch(console.error)
  }

  render () {
    const { book } = this.state
    const { user } = this.props
    const ownerButtons = (
      <div>
        <Button variant="danger" className="mr-2">Delete</Button>
        <Link to={`/books/${this.props.match.params.id}/edit`}>
          <Button>Edit</Button>
        </Link>
      </div>
    )

    return (
      <Layout md="8" lg="6">
        <h3>Book Details</h3>
        <h4>Title: {book.title}</h4>
        <p>Author: {book.author}</p>
        <p>First Published: {book.firstPublished}</p>
        <p>Original Language: {book.originalLanguage}</p>
        <p>Owner: {book.owner}</p>
        {user && user._id === book.owner ? ownerButtons : <p>{user ? 'You don\'t own this book' : 'Sign in to edit your books'}</p>}
      </Layout>
    )
  }
}

export default withRouter(Book)
