import clsx from 'clsx';
import { observer } from 'mobx-react-lite';
import PropTypes from 'prop-types';
import React from 'react';

import { PLAYERS, TILE_STATUS } from '../../consts';
import Store from '../../Store';

const BoardTile = ({
  store,
  tile,
  player
}) => {
  const { selectedShipID, currentPlayer } = store;
  const isGameCompleted = store.isGameCompleted();
  const isGameStarted = store.isGameStarted();

  const {
    isLabel, label, shipID, status
  } = tile;

  const showShips = player === PLAYERS.USER;

  const clickHandler = () => {
    if (
      !isGameCompleted &&
      !isGameStarted &&
      !shipID &&
      selectedShipID &&
      store.canDeployShip(tile, selectedShipID, player)
    ) {
      store.deployShip(tile, selectedShipID, player);
    }
    if (isGameStarted && !showShips) {
      store.attemptHit(tile, player);
    }
  };

  const isTileHit = status === TILE_STATUS.HIT;

  return (
    <button
      type="button"
      className={clsx('battleship__boardtile', {
        label: isLabel,
        deployable: !isLabel && store.canDeployShip(tile, selectedShipID, player),
        ocean: !isLabel,
        board__ship: !isLabel && (showShips || isTileHit) && shipID,
        hit: isTileHit,
        target: !showShips && !isLabel && !isTileHit
      })}
      onClick={clickHandler}
      disabled={isGameCompleted || (player === currentPlayer && isGameStarted)}
    >
      {label}
    </button>
  );
};

BoardTile.displayName = 'BoardTile';

BoardTile.propTypes = {
  store: PropTypes.instanceOf(Store).isRequired,
  tile: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string, PropTypes.number, PropTypes.bool
  ])).isRequired,
  player: PropTypes.number.isRequired
};

export default observer(BoardTile);
