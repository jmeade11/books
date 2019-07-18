[![General Assembly Logo](https://camo.githubusercontent.com/1a91b05b8f4d44b5bbfb83abac2b0996d8e26c92/687474703a2f2f692e696d6775722e636f6d2f6b6538555354712e706e67)](https://generalassemb.ly/education/web-development-immersive)

# React Auth Template Lesson

Use with the [express-api](https://git.generalassemb.ly/ga-wdi-boston/express-api).

## Installation

1. [Download](../../archive/master.zip) this template.
1. Unzip and rename the template directory (`unzip ~/Downloads/react-auth-template-master.zip`).
1. Move into the new project and `git init`.
1. Empty [`README.md`](README.md) and fill with your own content.
1. Replace `react-auth-template` in `package.json` with your
   projects name.
1. Replace the `"homepage"` field in `package.json` with your (public) Github
   account name and repository name.
1. Install dependencies with `npm install`.
1. `git add` and `git commit` your changes.
1. Run the development server with `npm start`.

## Add Books Component

Add the Books component in `src/books/components` and corresponding route to `App.js` to display a list of all books in the database.

## Add Book Component

Add the `Book` component in `src/books/components` and corresponding route to `App.js` to display the book details for an individual book.

## Add CreateBook Component

Add the `CreateBook` component in `src/books/components` and corresponding route to `App.js`.

## Convert Header Component to React-Bootstrap Navbar

Convert the `Header` Component to the React-Bootstrap Navbar
component.  Replace the home navlink with a link for the `/
books` route.  Delete the unneeded `Header.scss` file and the
corresponding import into `Header.js`.

## Add Edit and Delete Buttons to Book Component

Conditionally display edit and delete buttons on the `Book` component if the user is signed in and the current user is the owner of the book. Display a message if the user is not signed in or if the signed in user does not own the book.

Add the user as a prop to the Book component in the route in `App.js`.

## Add Formatted Date to Book Component

Display the originalLanguage and firstPublished values in the `Book` component.  Format the `firstPublished` date to display the date in a user-friendly manner.

## Add EditBook Component

Add an `EditBook` component to `src/books/components` and prepopulate it with the values for the current book.  Format the date to display properly in the form.  Add a corresponding route using `AuthenticatedRoute` component.

## Add Create Book Button to Books Component

Conditionally display add book button on the `Books` component if the user is signed in.

Add the user as a prop to the Books component in the route in `App.js`.

## Add Layout Component

Create a `Layout` component that uses `props.children` to wrap nested component elements with the React-Bootstrap `Row` and `Col` components.  Set up props that pass the col sizes to the Col component.

Use the Layout component to wrap each of the book components.

## Add Delete Book Functionality

Add an onClick handler to the `Delete` book button in the Book component.

## Update Auth Forms with React-Bootstrap and Layout Components

Update `SignIn`, `SignUp` and `ChangePassword` forms to use the react-bootstrap form components and the Layout component.

## Replace Bootstrap CSS File with Bootstrap Sass Import

The react-auth-template currently imports the compiled and minified bootstrap.css file in `index.js`. In order to be able to use the sass features in Bootstrap, you should remove this import and add `@import '~bootstrap/scss/bootstrap';` to the `src/css/index.scss` file.  Also, you can safely remove all of the styles in `src/App.scss` and `src/css/index.scss`.

## Next Steps:

1. **Use map() to add routes to App.js:**  To make `App.js` more readable and maintainable, create an array of route objects that can be used to generate the routes.
1. **Set the Books Component as the home page:** Or create a separate home page that loads when on the base url route.
1. **Add the AutoAlertComponent:** Create or copy the AutoAlertComponent as a wrapper for the Alert component so it times out and disappears.
1. **Create a Reuseable BookForm Component:** Use the react-crud lesson and the MovieForm as an example.
1. **Create a DeleteBook Component:** Separate the delete button as its own component.
1. **Add sort and filter options to Books component:** It would be great to be able to sort the books in descending order, ascending order and filter by owned books.  Remember that the state is what governs what is displayed on the page!
1. **Reorganize File Structure:** Restructure the files so they are better organized.

## [License](LICENSE)

1. All content is licensed under a CC­BY­NC­SA 4.0 license.
1. All software code is licensed under GNU GPLv3. For commercial use or
    alternative licensing, please contact legal@ga.co.
