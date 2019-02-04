import React, { Component } from 'react';

export default class Error extends Component {
    render() {
        return (
            <div className='editor__error '>
                <p>{this.props.searchError ? this.props.searchError : null}</p>
                <p>{this.props.placemarkError ? this.props.placemarkError : null}</p>
            </div>
        )
    }
}