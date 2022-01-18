/* global vi */
/* eslint-disable import/no-extraneous-dependencies */
import 'unfetch/polyfill';
import '@testing-library/jest-dom';
import { server } from '../src/mocks/server';

vi.mock('react-spinners/RingLoader');

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
