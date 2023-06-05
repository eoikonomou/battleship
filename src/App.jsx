import { CssBaseline, StyledEngineProvider, ThemeProvider } from '@mui/material';
import React from 'react';

import BattleshipDialog from './components/BattleshipDialog';
import GameContainer from './components/GameContainer';
import Store from './Store';
import { theme } from './utils';

const store = new Store();

const App = () => (
  <ThemeProvider theme={theme}>
    <StyledEngineProvider injectFirst>
      {' '}
      <CssBaseline />
      <BattleshipDialog store={store} />
      <GameContainer store={store} />
    </StyledEngineProvider>
  </ThemeProvider>
);

export default App;
