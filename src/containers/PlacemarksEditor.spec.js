import React from 'react';
import { shallow, mount } from 'enzyme';
import PlacemarksEditor from './PlacemarksEditor';

describe('PlacemarksEditor', () => {
    it('should render with props', () => {
        const component = shallow(<PlacemarksEditor />);

        expect(component).toMatchSnapshot();
    });
});