/* eslint-disable import/no-extraneous-dependencies */
import 'unfetch/polyfill';
import '@testing-library/jest-dom';
import { server } from '../src/mocks/server';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
