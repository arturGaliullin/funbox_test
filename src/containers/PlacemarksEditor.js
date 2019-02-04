import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { searchData, clearData } from '../actions/search';
import { addPlacemark, removePlacemark, getPlacemarkData, updatePlacemarks } from '../actions/placemark';
import EditorForm from '../components/EditorForm';
import EditorItems from '../components/EditorItems';
import Error from '../components/Error';

class PlacemarksEditor extends Component {
    render() {
        return (
            <div className="editor">
                <EditorForm
                    clearData={this.props.clearData}
                    searchData={this.props.searchData}
                    addPlacemark={this.props.addPlacemark}
                    results={this.props.results}
                />
                <Error placemarkError={this.props.placemarkError} searchError={this.props.searchError} />
                {this.props.placemarks.length > 0 ?
                    <EditorItems
                        placemarks={this.props.placemarks}
                        removePlacemark={this.props.removePlacemark}
                        updatePlacemarks={this.props.updatePlacemarks}
                    />
                : null}
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        searchData: bindActionCreators(searchData, dispatch),
        clearData: bindActionCreators(clearData, dispatch),
        addPlacemark: bindActionCreators(addPlacemark, dispatch),
        removePlacemark: bindActionCreators(removePlacemark, dispatch),
        getPlacemarkData: bindActionCreators(getPlacemarkData, dispatch),
        updatePlacemarks: bindActionCreators(updatePlacemarks, dispatch)
    }
}

export default connect(state => {
    return {
        results: state.search.results,
        searchError: state.search.error,
        placemarkError: state.placemark.error,
        placemarks: state.placemark.placemarks
    }
}, mapDispatchToProps)(PlacemarksEditor);
