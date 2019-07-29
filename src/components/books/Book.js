import React, { Component } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { Link, withRouter } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Layout from '../common/Layout'

class Book extends Component {
  constructor (props) {
    super(props)
    this.state = {
      book: {
        title: '',
        author: '',
        owner: '',
        firstPublished: '',
        originalLanguage: '',
        url: ''
      }
    }
  }

  componentDidMount () {
    axios(`${apiUrl}/books/${this.props.match.params.id}`)
      .then(res => {
        let formattedDate = ''
        if (res.data.book.firstPublished) {
          const options = {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
          }
          const dateObj = new Date(res.data.book.firstPublished)
          const offsetDate = new Date(dateObj.setMinutes(dateObj.getMinutes() + dateObj.getTimezoneOffset()))
          formattedDate = offsetDate.toLocaleDateString(undefined, options)
        }
        this.setState({
          book: {
            ...res.data.book,
            firstPublished: formattedDate
          }
        })
      })
      .catch(console.error)
  }

  handleDelete = event => {
    event.preventDefault()

    axios({
      url: `${apiUrl}/books/${this.props.match.params.id}`,
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${this.props.user.token}`
      }
    })
      .then(() => this.props.alert('Now you did it...', 'You deleted a book!', 'success'))
      .then(() => this.props.history.push('/books'))
      .catch(() => this.props.alert('Something went wrong :-( ', 'The book wasn\'t deleted. Maybe you should try again.', 'danger'))
  }

  render () {
    const { book } = this.state
    const { user } = this.props
    const ownerButtons = (
      <div>
        <Button variant="danger" className="mr-2" onClick={this.handleDelete}>Delete</Button>
        <Link to={`/books/${this.props.match.params.id}/edit`}>
          <Button>Edit</Button>
        </Link>
      </div>
    )

    return (
      <Layout md="8" lg="6">
        <h3>Book Details</h3>
        {book.url && <img src={book.url} alt={book.title} />}
        <h4>Title: {book.title}</h4>
        <p>Author: {book.author}</p>
        {book.firstPublished && <p>First Published: {book.firstPublished}</p>}
        {book.originalLanguage && <p>Original Language: {book.originalLanguage}</p>}
        {user && user._id === book.owner ? ownerButtons : <p>{user ? 'You don\'t own this book' : 'Sign in to edit your books'}</p>}
        <Button className="mt-2" href="#books"><i className="icofont-book-alt" /> Books</Button>
      </Layout>
    )
  }
}

export default withRouter(Book)
