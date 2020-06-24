import '@testing-library/jest-dom/extend-expect';
import MutationObserver from '@sheerun/mutationobserver-shim';
import { server } from './mocks/server';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// This is needed for React Testing Library until CRA updates Jest. See:
// https://github.com/testing-library/dom-testing-library/releases/tag/v7.0.0
window.MutationObserver = MutationObserver;
