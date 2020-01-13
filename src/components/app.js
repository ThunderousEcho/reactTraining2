"use strict"

import React from 'react';
import {Switch, Route} from 'react-router-dom';

import {Header} from './header.js';
import {Home} from './home.js';
import {BookList} from '../components/BookList';
import BookStore from '../stores/bookStore';
import {AuthorList} from '../components/AuthorList';
import AuthorStore from '../stores/authorStore';


export class App extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            bookState: "",
            books: [],
            editedBook: -1,
            authorState: "",
            authors: []
        }
    }

    render() {
        return(
            <div>
                <Header />
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route path='/books' render={(props) => (<BookList {...props} bookState={this.state.bookState} books={this.state.books} editedBook={this.state.editedBook} />)}/>
                    <Route path='/authors' render={(props) => (<AuthorList {...props} authorState={this.state.authorState} authors={this.state.authors} />)}/>
                </Switch>
            </div>
        );
    }

    componentDidMount(){
        BookStore.addChangeListener(this._onBookChange.bind(this));
        AuthorStore.addChangeListener(this._onAuthorChange.bind(this));
    }

    componentWillUnmount(){
        BookStore.removeChangeListener(this._onBookChange.bind(this));
        AuthorStore.removeChangeListener(this._onAuthorChange.bind(this));
    }

    _onBookChange(){
        this.setState({
            books: BookStore.getAllBooks(),
            bookState: BookStore.getBookState(),
            editedBook: BookStore.getEditedBook()
        });
    }

    _onAuthorChange(){
        this.setState({
            authors: AuthorStore.getAllAuthors(),
            authorState: AuthorStore.getAuthorState()
        });
    }
}