import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class EditorForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            placemark: '',
            placemarkData: null
        }
    }

    onHandleChange = (e) => {
        this.setState({
            placemark: e.target.value
        }, async () => {
            await this.props.searchData(this.state.placemark);
        });
    };

    onSelect = (name, data) => {
        this.setState({
            placemark: name,
            placemarkData: data
        }, () => {
            this.props.clearData();
        });
    };

    onSave = (e) => {
        e.preventDefault();
        this.setState({
            placemark: ''
        }, () => {
            if (this.state.placemarkData !== null && this.state.placemarkData.name) {
                this.props.addPlacemark(this.state.placemarkData);
            } else if (this.props.results.length > 0) {
                this.props.addPlacemark(this.props.results[0]);
                this.props.clearData();
            }
        });

    };

    render() {
        const { results } = this.props;

        return (
            <form onSubmit={this.onSave} className='editor__form'>
                <input
                    className='editor__form-input'
                    type="text"
                    onChange={this.onHandleChange}
                    value={this.state.placemark}
                    required={true}
                    name='placemark'
                />
                <div className='editor__form-results'>
                    {results.length > 0 ? results.map(result =>
                        <div
                            key={result.id}
                            className='editor__form-result'
                            onClick={() => this.onSelect(result.name, result)}
                        >
                            {result.name}
                        </div>
                    ) : null}
                </div>
                <button onClick={this.onSave} className="editor__form-button">Добавить</button>
            </form>
        );
    }
}

EditorForm.propTypes = {
    clearData: PropTypes.func,
    searchData: PropTypes.func,
    addPlacemark: PropTypes.func,
    results: PropTypes.array
};
