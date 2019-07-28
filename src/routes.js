export default [
  {
    path: '/books',
    exact: true,
    authenticated: false,
    render: true,
    component: {
      name: 'Book',
      user: true,
      alert: true
    }
  }
]
