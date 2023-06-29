import { setupServer } from 'msw/node';
import { handlers } from './handlers';

// setup Node request interception using the given mocks
export const mocksServer = setupServer(...handlers);
