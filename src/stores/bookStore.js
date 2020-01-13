import Dispatcher from '../dispatcher/appDispatcher';
import {EventEmitter} from 'events';
import Axios from 'axios';

const CHANGE_EVENT = 'change';

let _bookStore = {
    bookState: "",
    books: [],
    editedBook: -1
};

class BookStoreClass extends EventEmitter{

    addChangeListener(cb){
        this.on(CHANGE_EVENT, cb);
    }

    removeChangeListener(cb){
        this.removeListener(CHANGE_EVENT, cb);
    }

    emitChange(){
        this.emit(CHANGE_EVENT);
    }

    post(){
        Axios.post("/dummyUrl", _bookStore.books);
    }

    getAllBooks(){
        return _bookStore.books;
    }

    getBookState(){
        return _bookStore.bookState;
    }

    getEditedBook(){
        return _bookStore.editedBook;
    }
}

const BookStore = new BookStoreClass();

Dispatcher.register( (action) => {

    let maxId = 0;

    switch (action.actionType){
        case 'set book state':
            _bookStore.bookState = action.state;
            _bookStore.books = action.books;
            BookStore.emitChange();
            break;
        case 'delete book':
            _bookStore.books = _bookStore.books.filter(function(value){
                return value.id != action.id;
            });
            BookStore.post();
            BookStore.emitChange();
            break;
        case 'add book':
            _bookStore.books.forEach(book => {
                if (book.id > maxId) maxId = book.id;    
            });
            _bookStore.books.push({
                id: maxId + 1,
                title: "No Title",
                author: -1,
                publisher: -1
            });
            BookStore.post();
            BookStore.emitChange();
            break;
        case 'update book':
            _bookStore.books.forEach(book => {
                if (book.id == action.id) {
                    book[action.key] = action.value;
                }    
            });
            BookStore.post();
            BookStore.emitChange();
            break;
    }
} );

export default BookStore;