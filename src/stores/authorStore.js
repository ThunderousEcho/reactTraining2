import Dispatcher from '../dispatcher/appDispatcher';
import {EventEmitter} from 'events';

const CHANGE_EVENT = 'change';

let _authorStore = {
    authorState: "",
    authors: []
};

class AuthorStoreClass extends EventEmitter{

    addChangeListener(cb){
        this.on(CHANGE_EVENT, cb);
    }

    removeChangeListener(cb){
        this.removeListener(CHANGE_EVENT, cb);
    }

    emitChange(){
        this.emit(CHANGE_EVENT);
    }

    getAllAuthors(){
        return _authorStore.authors;
    }

    getAuthorState(){
        return _authorStore.authorState;
    }
}

const AuthorStore = new AuthorStoreClass();

Dispatcher.register( (action) => {
    switch (action.actionType){
        case 'set author state':
            _authorStore.authorState = action.state;
            _authorStore.authors = action.authors;
            AuthorStore.emitChange();
            break;
    }
} );

export default AuthorStore;