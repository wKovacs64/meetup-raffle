import { setupServer } from 'msw/node';
import { handlers } from './handlers';

// Setup Node (Jest) request interception using the given mocks.
export const server = setupServer(...handlers);

// some tests import msw exports from this file
export * from 'msw';
