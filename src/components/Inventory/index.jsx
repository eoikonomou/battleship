import './index.scss';

import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import clsx from 'clsx';
import { observer } from 'mobx-react-lite';
import PropTypes from 'prop-types';
import React from 'react';

import { ORIENTATION, PLAYERS } from '../../consts';
import Store from '../../Store';
import Ship from '../Ship';

const Inventory = ({ store }) => {
  const { orientation } = store;
  const unusedShips = store.getShips(PLAYERS.USER).filter(ship => !ship.deployed);

  const randomiseShips = () => {
    store.randomiseShips(PLAYERS.USER);
  };

  const changeOrientation = () => {
    store.toggleOrientation();
  };

  const resetShips = () => {
    store.resetShips(PLAYERS.USER);
  };

  const startGame = () => {
    store.startGame();
  };

  return (
    <div className="inventory__wrapper">
      <Typography variant="h6">SHIPS</Typography>
      <div className="inventory__controls">
        <Button variant="contained" onClick={randomiseShips}>Randomize</Button>
        <Button variant="contained" onClick={changeOrientation}>Flip ships</Button>
        <Button variant="contained" onClick={resetShips}>Reset</Button>
      </div>
      <div
        className={clsx('inventory', {
          horizontal: orientation === ORIENTATION.HORIZONTAL,
          vertical: orientation === ORIENTATION.VERTICAL
        })}
      >
        {unusedShips.map(unusedShip => (
          <Ship key={unusedShip.id} ship={unusedShip} store={store} />
        ))}
        {unusedShips.length === 0 && (
          <Button variant="contained" onClick={startGame}>
            START GAME!
          </Button>
        )}
      </div>
    </div>
  );
};

Inventory.displayName = 'Inventory';

Inventory.propTypes = {
  store: PropTypes.instanceOf(Store).isRequired
};

export default observer(Inventory);
