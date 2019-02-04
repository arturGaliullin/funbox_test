import React from 'react';
import { shallow, mount } from 'enzyme';
import EditorItems from './EditorItems';

const props = {
    placemarks: [],
    removePlacemark: () => {},
    updatePlacemarks: () => {},
};

describe('EditorItems', () => {
    it('should render with props', () => {
        const component = shallow(<EditorItems {...props} />);

        expect(component).toMatchSnapshot();
    });

    it('test delete placemark', () => {
        props.placemarks = [{id: 1, name: 'name'}, {id: 2, name: 'name-1'}];
        const component = shallow(<EditorItems {...props} />);
        const buttonClose = component.find('.editor__item-button').first();
        buttonClose.simulate('click', {preventDefault: () => {}});
        component.instance().removePlacemark = jest.fn();
        component.update();
        component.instance().removePlacemark({preventDefault: () => {}}, props.placemarks[0].id);
        expect(component.instance().removePlacemark).toHaveBeenCalled();
    });
});