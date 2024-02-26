import { setupServer } from 'msw/node';
import { handlers } from './handlers';

// setup Node request interception using the given mocks
const mocksServer = setupServer(...handlers);

mocksServer.listen({ onUnhandledRequest: 'error' });

// eslint-disable-next-line no-console
console.info('🔶 Mock server running');

process.once('SIGINT', () => mocksServer.close());
process.once('SIGTERM', () => mocksServer.close());
