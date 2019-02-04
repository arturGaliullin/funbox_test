import Enzyme, { shallow, render, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import toJson from 'enzyme-to-json'
import uuidv4 from 'uuid/v4';

Enzyme.configure({ adapter: new Adapter() })

global.shallow = shallow
global.render = render
global.mount = mount
global.toJson = toJson

jest.mock('uuid/v4', () => {
    let value = 1;
    return () => (value++)
});


console.error = message => {
    throw new Error(message)
}