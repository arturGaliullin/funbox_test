import React from 'react';
import { shallow } from 'enzyme';
import Error from './Error';

const props = {
    searchError: false,
    placemarkError: false
};

describe('Error', () => {
    it('should render with props', () => {
        const component = shallow(<Error {...props} />);
        expect(component).toMatchSnapshot();
    });

    it('should render with searchError is "Произошла ошибка при поиске, повторите позже."', () => {
        props.searchError = 'Произошла ошибка при поиске, повторите позже.';
        const component = shallow(<Error {...props} />);
        expect(component.find('p').first().text()).toEqual('Произошла ошибка при поиске, повторите позже.');
    });

    it('should render with placemarkError is "Произошла ошибка при загрузке данных метки, повторите позже."', () => {
        props.placemarkError = 'Произошла ошибка при загрузке данных метки, повторите позже.';
        const component = shallow(<Error {...props} />);
        expect(component.find('p').last().text()).toEqual('Произошла ошибка при загрузке данных метки, повторите позже.');
    });

});