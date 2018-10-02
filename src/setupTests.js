/* eslint-disable import/no-extraneous-dependencies */
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import * as emotion from 'emotion';
import { createSerializer } from 'jest-emotion';
// replaces afterEach(cleanup)
import 'react-testing-library/cleanup-after-each';

expect.addSnapshotSerializer(createSerializer(emotion));

Enzyme.configure({ adapter: new Adapter() });
