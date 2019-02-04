import React from 'react';
import { shallow, mount } from 'enzyme';
import EditorForm from './EditorForm';

const props = {
    clearData: () => {},
    searchData: () => {},
    addPlacemark: () => {},
    results: []
};

const state = {
    placemark: '',
    placemarkData: null
}

describe('EditorForm', () => {
    it('should render with props', () => {
        const component = shallow(<EditorForm {...props} {...state} />);

        expect(component).toMatchSnapshot();
    });

    it('check onChange', () => {
        const component = shallow(<EditorForm {...props} {...state} />);

        component.find('.editor__form-input').simulate('change', {target: {value: 'value'}});
        expect(component.state('placemark')).toBe('value');
    });

    it('check result onClick', () => {
        props.results = [{id: 1, name: 'name'}, {id: 2, name: 'name-1'}];
        let componentMount = mount(<EditorForm {...props} {...state} />);

        componentMount.find('.editor__form-result').first().simulate('click');
        componentMount.find('.editor__form-input').instance().value = props.results[0].name;

        state.placemarkData = props.results[0];
        state.placemark = props.results[0].name;

        expect(componentMount.find('.editor__form-input').props().value).toBe(props.results[0].name);
        expect(componentMount.state('placemarkData')).toBe(props.results[0]);
        expect(componentMount.state('placemark')).toBe(props.results[0].name);

        props.results = [];

        componentMount = mount(<EditorForm {...props} {...state} />);
        expect(componentMount.props().results).toHaveLength(0);
    });

});