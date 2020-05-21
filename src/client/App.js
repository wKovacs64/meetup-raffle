/** @jsx jsx */
import '@wkovacs64/normalize.css';
import { jsx, ThemeProvider, Flex, Container } from 'theme-ui';
import Header from './components/Header';
import Raffle from './components/Raffle';
import { theme } from './theme';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Flex
        sx={{
          flexDirection: 'column',
          height: '100%',
        }}
      >
        <Header />
        <Container as="main">
          <Raffle />
        </Container>
      </Flex>
    </ThemeProvider>
  );
};

App.displayName = 'App';

export default App;
