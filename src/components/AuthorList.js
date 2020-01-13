"use strict"

import React from 'react';
import PropTypes from 'prop-types';
import AuthorActions from '../actions/authorActions';

export class AuthorList extends React.Component{

    createAuthorRow(author){
        return (
            <tr key={author.id}>
                <td> {author.id} </td>
                <td> {author.firstName} </td>
                <td> {author.lastName} </td>
            </tr>
        );
    }

    componentDidMount(){
        AuthorActions.readAuthors();
    }

    render() {
        
        let content;

        switch (this.props.authorState) {
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
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.authors.map(this.createAuthorRow, this)}
                        </tbody>    
                    </table>
                );
                break;
            default:
                content = (
                    <div className="alert alert-danger" role="alert">
                        {this.props.authorState}
                    </div>
                );
                break;
        }

        return(
            <div>
                <h1>Authors</h1>
                {content}
            </div>
        );
    }
}

AuthorList.propTypes = {
    authorState: PropTypes.string.isRequired,
    authors: PropTypes.array.isRequired
};



