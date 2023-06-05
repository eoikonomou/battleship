import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import { observer } from 'mobx-react-lite';
import PropTypes from 'prop-types';
import React from 'react';

import Store from '../../Store';
import Game from '../Game';

const GameContainer = ({ store }) => (
  <div className="battleship">
    <Typography variant="h4">BATTLESHIP</Typography>
    <Typography variant="p">{store.infoMessage}</Typography>
    {store.canRestart && (
      <Button variant="contained" onClick={() => store.restartGame()}>Restart</Button>
    )}
    <Game store={store} />
  </div>
);

GameContainer.displayName = 'GameContainer';

GameContainer.propTypes = {
  store: PropTypes.instanceOf(Store).isRequired
};

export default observer(GameContainer);
