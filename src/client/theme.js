export const theme = {
  //
  // theme spec
  //
  breakpoints: ['30em', '60em'],
  colors: {
    // spec
    text: '#111', // near black
    background: '#f4f4f4', // near white
    primary: '#00449e', // dark blue
    secondary: 'primary', // CURRENTLY UNUSED
    accent: '#ff4136', // red
    muted: '#ccc', // moon grey
    // custom
    title: '#fff', // white
    subtitle: '#000', // black
    formFieldBg: '#fff', // white
  },
  sizes: [
    /* 0 */ 'none',
    /* 1 */ '1rem',
    /* 2 */ '2rem',
    /* 3 */ '4rem',
    /* 4 */ '8rem',
    /* 5 */ '16rem',
    /* 6 */ '32rem',
    /* 7 */ '48rem',
    /* 8 */ '64rem',
    /* 9 */ '96rem',
  ],
  space: [
    /* 0 */ '0',
    /* 1 */ '.25rem',
    /* 2 */ '.5rem',
    /* 3 */ '1rem',
    /* 4 */ '2rem',
    /* 5 */ '4rem',
    /* 6 */ '8rem',
    /* 7 */ '16rem',
    /* 8 */ '32rem',
  ],
  fontSizes: [
    /* 0 */ '.75rem',
    /* 1 */ '.875rem',
    /* 2 */ '1rem',
    /* 3 */ '1.25rem',
    /* 4 */ '1.5rem',
    /* 5 */ '2.25rem',
    /* 6 */ '3rem',
    /* 7 */ '5rem',
    /* 8 */ '6rem',
  ],
  fontWeights: {
    body: 400,
    heading: 700,
    bold: 700,
  },
  fonts: {
    body:
      'system-ui, -apple-system, -apple-system, BlinkMacSystemFont, "avenir next", avenir, "helvetica neue", helvetica, ubuntu, roboto, noto, "segoe ui", arial, sans-serif',
    heading: 'inherit',
    monospace: '"Courier Next", courier, monospace',
  },
  lineHeights: {
    body: 1.15,
    heading: 1.25,
    label: 1.5,
  },
  borderWidths: [
    /* 0 */ '0',
    /* 1 */ '.125rem',
    /* 2 */ '.25rem',
    /* 3 */ '.5rem',
    /* 4 */ '1rem',
    /* 5 */ '2rem',
  ],
  shadows: [
    /* 0 */ 'none',
    /* 1 */ '0px 0px 4px 2px rgba(0, 0, 0, 0.2)',
    /* 2 */ '0px 0px 8px 2px rgba(0, 0, 0, 0.2)',
    /* 3 */ '2px 2px 4px 2px rgba(0, 0, 0, 0.2)',
    /* 4 */ '2px 2px 8px 0px rgba(0, 0, 0, 0.2)',
    /* 5 */ '4px 4px 8px 0px rgba(0, 0, 0, 0.2)',
  ],
  //
  // variants
  //
  layout: {
    container: {
      maxWidth: [6, 7],
      paddingX: 3,
    },
  },
  text: {
    // spec
    heading: {
      fontFamily: 'heading',
      fontWeight: 'heading',
      lineHeight: 'heading',
    },
    body: {
      fontFamily: 'body',
      fontWeight: 'body',
      lineHeight: 'body',
    },
    // custom
    title: {
      color: 'title',
      textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
      fontFamily: 'heading',
      fontWeight: 'heading',
      lineHeight: 'heading',
    },
    subtitle: {
      color: 'subtitle',
      fontFamily: 'heading',
      fontWeight: 'heading',
      lineHeight: 'heading',
    },
  },
  buttons: {
    primary: {
      cursor: 'pointer',
      width: ['100%', 5],
      px: 5,
      py: 3,
      boxShadow: 5,
      fontSize: [2, 3],
      fontWeight: 'bold',
      color: 'text',
      bg: 'formFieldBg',
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: 'text',
      borderRadius: 0,
      '&:focus, &:hover': {
        bg: 'muted',
      },
      '&:disabled': {
        cursor: 'not-allowed',
        opacity: 0.5,
      },
    },
    icon: {
      cursor: 'pointer',
      height: 3,
      width: 3,
      p: 2,
      '&:disabled': {
        cursor: 'not-allowed',
        opacity: 0.2,
      },
    },
  },
  forms: {
    label: {
      cursor: 'pointer',
      color: 'primary',
      lineHeight: 'label',
      fontSize: [3, 4],
    },
    input: {
      color: 'text',
      bg: 'formFieldBg',
      borderStyle: 'solid',
      borderRadius: 0,
    },
  },
  //
  // styles
  //
  styles: {
    root: {
      fontFamily: 'body',
      fontWeight: 'body',
      lineHeight: 'body',
    },
    a: {
      color: 'primary',
      textDecoration: 'none',
    },
  },
};
