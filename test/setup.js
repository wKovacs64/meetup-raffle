import 'unfetch/polyfill';
import '@testing-library/jest-dom/extend-expect';
import { server } from '../src/mocks/server';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
