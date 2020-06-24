import { setupWorker } from 'msw';
import { handlers } from './handlers';

// Setup browser request interception using the given mocks.
export const worker = setupWorker(...handlers);
