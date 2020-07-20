/** @jsx jsx */
import React from 'react';
import { jsx, Box, Heading, Grid, Label, Checkbox, IconButton } from 'theme-ui';
import { worker } from '../../mocks/browser';
import AppProviders from '../AppProviders';

function ToolsIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      width="32"
      height="32"
      {...props}
    >
      <path
        fillRule="evenodd"
        d="M4.48 7.27c.26.26 1.28 1.33 1.28 1.33l.56-.58-.88-.91 1.69-1.8s-.76-.74-.43-.45c.32-1.19.03-2.51-.87-3.44C4.93.5 3.66.2 2.52.51l1.93 2-.51 1.96-1.89.52-1.93-2C-.19 4.17.1 5.48 1 6.4c.94.98 2.29 1.26 3.48.87zm6.44 1.94l-2.33 2.3 3.84 3.98c.31.33.73.49 1.14.49.41 0 .82-.16 1.14-.49.63-.65.63-1.7 0-2.35l-3.79-3.93zM16 2.53L13.55 0 6.33 7.46l.88.91-4.31 4.46-.99.53-1.39 2.27.35.37 2.2-1.44.51-1.02L7.9 9.08l.88.91L16 2.53z"
      ></path>
    </svg>
  );
}

function CloseIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="48"
      height="48"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  );
}

function ToggleButton(props) {
  return (
    <IconButton
      variant="devToolsToggle"
      aria-label="Toggle Developer Tools"
      type="button"
      {...props}
    />
  );
}

function DevTools() {
  const [isOpen, setIsOpen] = React.useState(false);

  function toggleVisibility() {
    setIsOpen(!isOpen);
  }

  function toggleMocking(e) {
    if (e.target.checked) worker.start();
    else worker.stop();
  }

  return (
    <AppProviders>
      <ToggleButton onClick={toggleVisibility}>
        {isOpen ? <CloseIcon /> : <ToolsIcon />}
      </ToggleButton>
      <Box
        sx={{
          position: 'absolute',
          left: 0,
          bottom: 0,
          overflow: 'hidden',
          p: isOpen ? [3, 4] : 0,
          height: isOpen ? 'auto' : 0,
          width: '100%',
          bg: 'rgba(0, 0, 0, 0.8)',
        }}
      >
        <Heading as="h3" variant="devToolsTitle" sx={{ mb: [3, 4] }}>
          Developer Tools
        </Heading>
        <Grid gap={[3, 4]} columns={[1, 1, 2]} sx={{ width: ['100%', '90%'] }}>
          <Label htmlFor="devToolsMockToggle" variant="devToolsLabel">
            Mock network requests:
            <Checkbox
              id="devToolsMockToggle"
              type="checkbox"
              defaultChecked="true"
              onChange={toggleMocking}
              variant="devToolsCheckbox"
              sx={{ ml: 2 }}
            />
          </Label>
        </Grid>
      </Box>
    </AppProviders>
  );
}

export default DevTools;
