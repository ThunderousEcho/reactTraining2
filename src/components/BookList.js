"use strict"

import React from 'react';
import PropTypes from 'prop-types';
import BookActions from '../actions/bookActions';

export class BookList extends React.Component{

    createBookRow(book){

        function deleteThisBook() {
            BookActions.deleteBook(book.id);
        }

        function updateBookTitle(event) {
            BookActions.updateBook(book.id, "title", event.target.value);
        }

        function updateBookAuthor(event) {
            BookActions.updateBook(book.id, "author", parseFloat(event.target.value) || 0);
        }

        function updateBookPublisher(event) {
            BookActions.updateBook(book.id, "publisher", parseFloat(event.target.value) || 0);
        }

        return (
            <tr key={book.id}>
                <td>
                    <button type="button" className="btn btn-danger" onClick={deleteThisBook}>Delete Book</button>
                </td>
                <td> {book.id} </td>
                <td>
                    <div className="input-group mb-3">
                        <input type="text" onChange={updateBookTitle} className="form-control" aria-label="Title" value={book.title}/>
                    </div>
                </td>
                <td>
                    <div className="input-group mb-3">
                        <input type="number" onChange={updateBookAuthor} className="form-control" aria-label="Author" value={book.author}/>
                    </div>
                </td>
                <td>
                    <div className="input-group mb-3">
                        <input type="number" onChange={updateBookPublisher} className="form-control" aria-label="Publisher" value={book.publisher}/>
                    </div>
                </td>
            </tr>
        );
    }

    componentDidMount(){
        BookActions.readBooks();
    }

    render() {
        
        let content;

        switch (this.props.bookState) {
            case "pending":
                content = (
                    <div className="d-flex justify-content-center">
                        <div className="spinner-border" role="status">
                            <span className="sr-only">Loading...</span>
                        </div> 
                    </div>
                );
                break;
            case "success":
                content = (
                    <React.Fragment>
                        <button type="button" className="btn btn-primary" onClick={BookActions.addBook}>Add Book</button>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>ID</th>
                                    <th>Title</th>
                                    <th>Author</th>
                                    <th>Publisher</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.books.map(this.createBookRow, this)}
                            </tbody>    
                        </table>
                    </React.Fragment>
                );
                break;
            default:
                content = (
                    <div className="alert alert-danger" role="alert">
                        {this.props.bookState}
                    </div>
                );
                break;
        }

        return(
            <div>
                <h1>Books</h1>
                {content}
            </div>
        );
    }
}

BookList.propTypes = {
    bookState: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired,
    editedBook: PropTypes.number.isRequired
};



