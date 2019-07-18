import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'

class Book extends Component {
  constructor (props) {
    super(props)
    this.state = {
      book: {
        title: '',
        author: ''
      }
    }
  }

  componentDidMount () {
    axios(`${apiUrl}/books/${this.props.match.params.id}`)
      .then(res => this.setState({ book: res.data.book }))
      .catch(console.error)
  }

  render () {
    const { book } = this.state

    return (
      <div>
        <h3>Book Details</h3>
        <h4>Title: {book.title}</h4>
        <p>Author: {book.author}</p>
      </div>
    )
  }
}

export default withRouter(Book)
