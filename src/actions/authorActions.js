import Dispatcher from '../dispatcher/appDispatcher';
import axios from 'axios'

const AuthorsActions = {
    readAuthors: function(){
        Dispatcher.dispatch({
            actionType: 'set author state',
            state: 'pending',
            authors: []
        });
        axios.get(`http://www.mocky.io/v2/5e18cf4e2f00006e0597e17f`)
        .then(res => {
            Dispatcher.dispatch({
                actionType: 'set author state',
                state: 'success',
                authors: res.data
            });
        })
        .catch( (error) => {
            Dispatcher.dispatch({
                actionType: 'set author state',
                state: error.toString(),
                authors: []
            });
        });
    }
}

module.exports = AuthorsActions;