import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const BookForm = ({ book, handleChange, handleSubmit }) => {
  const cancelpath = book._id ? `#books/${book._id}` : '#books'

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="title">
        <Form.Label>Book Title</Form.Label>
        <Form.Control
          type="text"
          placeholder="Title"
          name="title"
          onChange={handleChange}
          value={book.title}
        />
      </Form.Group>
      <Form.Group controlId="author">
        <Form.Label>Book Author</Form.Label>
        <Form.Control
          type="text"
          placeholder="Author"
          name="author"
          onChange={handleChange}
          value={book.author}
        />
      </Form.Group>
      <Form.Group controlId="originalLanguage">
        <Form.Label>Original Language</Form.Label>
        <Form.Control
          type="text"
          placeholder="Original Language"
          name="originalLanguage"
          onChange={handleChange}
          value={book.originalLanguage}
        />
      </Form.Group>
      <Form.Group controlId="firstPublished">
        <Form.Label>First Published</Form.Label>
        <Form.Control
          type="date"
          placeholder="First Published"
          name="firstPublished"
          onChange={handleChange}
          value={book.firstPublished}
        />
      </Form.Group>
      <Form.Group controlId="file" encType="multipart/form-data">
        <Form.Label>{book._id ? book.url : 'Book Cover'}</Form.Label>
        <Form.Control
          type="file"
          name="file"
          onChange={handleChange}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
      <Button variant="danger" href={cancelpath} className="ml-2"><i className="icofont-arrow-left" /> Cancel</Button>
    </Form>
  )
}

export default BookForm
