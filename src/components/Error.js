import React, { Component } from 'react';
import PropTypes from 'prop-types';

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

Error.propTypes = {
    placemarkError: PropTypes.any,
    searchError: PropTypes.any
};