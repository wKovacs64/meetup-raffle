import 'unfetch/polyfill/index';
import '@testing-library/jest-dom';
import { server } from '../src/mocks/server';

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
