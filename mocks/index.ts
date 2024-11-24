import { setupServer } from 'msw/node';
import { handlers } from './handlers';

// setup Node request interception using the given mocks
const mocksServer = setupServer(...handlers);

mocksServer.listen({ onUnhandledRequest: 'error' });

console.info('🔶 Mock server running');

process.once('SIGINT', () => mocksServer.close());
process.once('SIGTERM', () => mocksServer.close());
