/* eslint-disable import/no-extraneous-dependencies */
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
// replaces afterEach(cleanup)
import 'react-testing-library/cleanup-after-each';

Enzyme.configure({ adapter: new Adapter() });
