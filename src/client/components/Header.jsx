import * as React from 'react';
import { useThemeUI, Box, Flex, Heading } from 'theme-ui';
import GitHubCorner from 'react-github-corner';

function Header() {
  const { theme } = useThemeUI();

  return (
    <header sx={{ bg: 'accent', p: 3 }}>
      <GitHubCorner
        bannerColor={theme.colors.text}
        href="https://github.com/wKovacs64/meetup-raffle"
        target="_blank"
        rel="noreferrer noopener"
      />
      <Flex
        sx={{
          height: ['auto', '25vh'],
          justifyContent: ['normal', 'center'],
          alignItems: 'center',
        }}
      >
        <Box>
          <Heading
            as="h1"
            variant="text.title"
            sx={{
              fontSize: [4, 5, 6],
              textAlign: ['left', 'center'],
            }}
          >
            <span role="img" aria-hidden>
              🤝
            </span>{' '}
            meetup-raffle{' '}
            <span role="img" aria-hidden>
              🎟️
            </span>
          </Heading>
          <Heading as="h2" variant="text.subtitle" sx={{ fontSize: [1, 3, 4] }}>
            Draw raffle winners at your Meetup event
          </Heading>
        </Box>
      </Flex>
    </header>
  );
}

Header.displayName = 'Header';

export default Header;
