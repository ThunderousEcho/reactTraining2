import Dispatcher from '../dispatcher/appDispatcher';
import axios from 'axios'

const BooksActions = {
    readBooks: function(){
        Dispatcher.dispatch({
            actionType: 'set book state',
            state: 'pending',
            books: []
        });
        axios.get(`http://www.mocky.io/v2/5e18c8542f0000680097e172`)
        .then(res => {
            Dispatcher.dispatch({
                actionType: 'set book state',
                state: 'success',
                books: res.data
            });
        })
        .catch( (error) => {
            Dispatcher.dispatch({
                actionType: 'set book state',
                state: error.toString(),
                books: []
            });
        });
    },
    deleteBook: function(id){
        Dispatcher.dispatch({
            actionType: 'delete book',
            id
        });
    },
    beginEditBook: function(id){
        Dispatcher.dispatch({
            actionType: 'begin edit book',
            id
        });
    },
    addBook: function(){
        Dispatcher.dispatch({
            actionType: 'add book'
        });
    },
    updateBook: function(id, key, value){
        Dispatcher.dispatch({
            actionType: 'update book',
            id, key, value
        });
    }
}

module.exports = BooksActions;