import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import MapContainer from './containers/Map';
import PlacemarksEditor from './containers/PlacemarksEditor';

describe('App', () => {
    const component = shallow(<App />);

    it('should render', () => {
        expect(component).toMatchSnapshot();
    });

    it('check render MapContainer', () => {
        expect(component.find(MapContainer)).toHaveLength(1);
    });

    it('check render PlacemarksEditor', () => {
        expect(component.find(PlacemarksEditor)).toHaveLength(1);
    })
});