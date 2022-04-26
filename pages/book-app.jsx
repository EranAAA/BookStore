import { bookService } from "../services/book.service.js";
import { googleApiService } from "../services/google-api.service.js";
import { BookList } from "../cmps/book-list.jsx";
import { BookFilter } from "../cmps/book-filter.jsx";
import { GoogleBookApi } from "../cmps/book-api.jsx";
import { eventBusService } from "../services/event-bus-service.js";

const { Link } = ReactRouterDOM;

export class BookApp extends React.Component {
  state = {
    books: [],
    filterBy: null,
    isSelectedBook: false,
    selectedBook: {},
    googleResults: [],
  };

  componentDidMount() {
    this.loadBooks();
  }

  onSearchBookApi = (value) => {
    googleApiService.getBookApi(value)
      .then((data) => {
        console.log('Data: ', data);
        this.setState({ googleResults: data })
      })
  }

  onAddBookFromGoogle = (book) => {
    bookService.addBookFromGoogle(book)
      .then(()=>{
        console.log('Added New Book');
        this.loadBooks();
        this.setState({ googleResults: [] })
      })
      .then(() => {
        // this.onGoBack()
        eventBusService.emit('user-msg', {
            type: 'success', txt: `Book "${book.title}" was successfully added`, bookId: book.id
        })
      })
      .catch(() => {
        eventBusService.emit('user-msg', {
            type: 'danger', txt: 'Could not added book :('
        })
      })
  }

  loadBooks = () => {
    bookService
      .query(this.state.filterBy)
      .then((books) => this.setState({ books }));
  };

  onSelectBook = (bookId) => {
    console.log(bookId);
    bookService.getBookById(bookId).then((book) => {
      this.setState({ selectedBook: book, isSelectedBook: true });
    });
  };

  // wait until finish update filter and then LoadBook
  onSetFilter = (filter) => {
    this.setState({ filterBy: filter }, () => {
      this.loadBooks();
    });
  };

  onUnSelectBook = () => {
    console.log("onUnSelectBook");
    this.setState({ isSelectedBook: false });
  };

  render() {
    const { books, filterBy, googleResults } = this.state;
    return (
      <section className='book-app'>
        <BookFilter filterBy={filterBy} onSetFilter={this.onSetFilter} />
        <div className="btn-add-container">
          <GoogleBookApi searchApi={this.onSearchBookApi} googleResults={googleResults} selectGoogleBook={this.onAddBookFromGoogle}/>
          <Link to={`/book/edit/`}><button className="add-btn">Add Book Manually</button></Link>
        </div>

        <BookList selectBook={this.onSelectBook} books={books} />
      </section>
    );
  }
}