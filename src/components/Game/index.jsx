import './index.scss';

import { observer } from 'mobx-react-lite';
import PropTypes from 'prop-types';
import React from 'react';

import { GAME_STATUS, PLAYERS } from '../../consts';
import Store from '../../Store';
import Board from '../Board';
import Inventory from '../Inventory';

const Game = ({ store }) => (
  <div className="battleship__game">
    <Board store={store} player={PLAYERS.USER} />
    {store.gameStatus === GAME_STATUS.NOT_STARTED && <Inventory store={store} />}
    {store.gameStatus !== GAME_STATUS.NOT_STARTED && <Board store={store} player={PLAYERS.AI} />}
  </div>
);

Game.displayName = 'Game';

Game.propTypes = {
  store: PropTypes.instanceOf(Store).isRequired
};

export default observer(Game);
