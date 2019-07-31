import React, { Component } from 'react'
import apiUrl from '../../apiConfig'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import Layout from '../common/Layout'
import BookForm from './BookForm'

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

    const formData = new FormData(event.target)
    formData.append('_id', this.state.book._id)

    axios({
      method: 'PATCH',
      url: `${apiUrl}/books/${this.props.match.params.id}`,
      contentType: false,
      processData: false,
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      },
      data: formData
    })
      .then(() => this.props.history.push(`/books/${this.state.book._id}`))
      .then(() => this.props.alert('Nice!', 'You successfully updated this book.', 'success'))
      .catch(() => this.props.alert('Today is not your day.', 'It didn\'t work.  You should try again.', 'danger'))
  }

  render () {
    const { book } = this.state

    return (
      <Layout md="8" lg="6">
        <BookForm
          book={book}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </Layout>
    )
  }
}

export default withRouter(EditBook)
