import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#0D2038',
      contrastText: 'white'
    },
    secondary: {
      main: '#7B61FF',
      contrastText: 'white'
    }
  }
});

/**
 * Returns a deep copy of a json structure (object or array).
 * Does not work with unserializable data such as dates and window references.
 * @param {object|array} input - The object or array to be copied
 * @return {object|array}
 */
export const copyObject = input => JSON.parse(JSON.stringify(input));
