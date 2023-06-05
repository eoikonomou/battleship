import './index.scss';

import Typography from '@mui/material/Typography';
import { observer } from 'mobx-react-lite';
import PropTypes from 'prop-types';
import React from 'react';

import { PLAYER_LABEL } from '../../consts';
import Store from '../../Store';
import BoardTile from '../BoardTile';

const Board = ({ store, player }) => {
  const renderBoard = () => (
    <div className="battleship__board--wrapper">
      {store.getGrid(player).map(tile => (
        <BoardTile
          key={tile.id}
          tile={tile}
          player={player}
          store={store}
        />
      ))}
    </div>
  );

  return (
    <div className="battleship__board">
      <Typography variant="h6">{PLAYER_LABEL[player]}</Typography>
      {renderBoard()}
    </div>
  );
};

Board.displayName = 'Board';

Board.propTypes = {
  store: PropTypes.instanceOf(Store).isRequired,
  player: PropTypes.number.isRequired
};

export default observer(Board);
