import { CssBaseline, StyledEngineProvider, ThemeProvider } from '@mui/material';
import React from 'react';

import BattleshipDialog from './components/BattleshipDialog';
import Game from './components/Game';
import Store from './Store';
import { theme } from './utils';

const store = new Store();

const App = () => (
  <ThemeProvider theme={theme}>
    <StyledEngineProvider injectFirst>
      {' '}
      <CssBaseline />
      {/* TODO: Appbar */}
      <BattleshipDialog store={store} />
      <Game store={store} />
    </StyledEngineProvider>
  </ThemeProvider>
);

export default App;
