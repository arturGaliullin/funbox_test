import React from 'react';
import { shallow, mount } from 'enzyme';
import Map from './Map';

describe('Map', () => {
    it('should render with props', () => {
        const component = shallow(<Map />);

        expect(component).toMatchSnapshot();
    });
});