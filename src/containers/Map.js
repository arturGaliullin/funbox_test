import React, { Component } from 'react';
import { connect } from 'react-redux';
import { YMaps, Map, Placemark, Polyline } from 'react-yandex-maps';
import { bindActionCreators } from 'redux';
import { getPlacemarkData } from '../actions/placemark';

class MapContainer extends Component {
    onDragEnd = (e, id) => {
        e.preventDefault();
        this.props.getPlacemarkData(e.originalEvent.target.geometry._coordinates, id);
    };

    render() {
        const { placemarks } = this.props;
        let mapCenter = null;

        if (placemarks.length > 0) {
            mapCenter = placemarks[placemarks.length - 1].coords;
        }

        return (
            <YMaps>
                <div>
                    <Map
                        state={{
                            center: mapCenter === null ? [55.75, 37.57] : mapCenter,
                            zoom: 9
                        }}
                        width={'100%'}
                        height={500}
                    >
                        {placemarks.length > 0 ?
                            placemarks.map((placemark, i) =>
                                <Placemark
                                    key={placemark.id}
                                    geometry={placemark.coords}
                                    onDragend={(e) => this.onDragEnd(e, placemark.id)}
                                    properties={{
                                        hintContent: `#${i+1}`,
                                        balloonContent: placemark.name + ' ' + placemark.coords,
                                    }}
                                    modules={
                                        ['geoObject.addon.balloon', 'geoObject.addon.hint']
                                    }
                                    options={{
                                        draggable: true,
                                    }}
                                />
                            )
                            :null
                        }
                        {placemarks.length > 0 ?
                            <Polyline
                                geometry={placemarks.map(placemark => placemark.coords)}
                                options={{
                                    balloonCloseButton: false,
                                    strokeColor: '#000',
                                    strokeWidth: 4,
                                    strokeOpacity: 0.5,
                                }}
                            />
                            :null
                        }
                    </Map>
                </div>
            </YMaps>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getPlacemarkData: bindActionCreators(getPlacemarkData, dispatch)
    }
}

export default connect(state => {
    return {
        placemarks: state.placemark.placemarks
    }
}, mapDispatchToProps)(MapContainer);
