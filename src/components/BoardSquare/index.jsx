import Grid from '@mui/material/Grid';
import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { BOARD, PLAYERS } from '../../consts';
import Store from '../../Store';

const BoardSquare = ({
  store,
  x,
  y,
  player
}) => {
  const getBoardPositionContent = () => {
    if ((x === 0 && y === 0) || x * y > 0) {
      return null;
    }
    if (x === 0) {
      return y;
    }
    return BOARD.LABELS[x];
  };

  return (
    <Grid
      key={`column-${y}`}
      item
      xs={1}
      className={clsx('battleship__board--col', {
        label: x * y === 0,
        occupied: player === PLAYERS.USER &&
          store.isPositionOccupied(x - 1, y - 1, player),
        hit: !store.isShipHitAtPosition(x - 1, y - 1, player)
      })}
    >
      {getBoardPositionContent()}
    </Grid>
  );
};

BoardSquare.displayName = 'BoardSquare';

BoardSquare.propTypes = {
  store: PropTypes.instanceOf(Store).isRequired,

};

export default BoardSquare;
