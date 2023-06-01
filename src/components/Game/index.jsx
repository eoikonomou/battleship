import { observer } from 'mobx-react-lite';
import PropTypes from 'prop-types';
import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { PLAYERS } from '../../consts';

import Store from '../../Store';
import Board from '../Board';
import Inventory from '../Inventory';

const Game = ({ store }) => {


  return (
    <div className="battleship__game">
      <DndProvider backend={HTML5Backend}>
        <Board store={store} player={PLAYERS.USER} onDrop={moveItem} />
        <Inventory ships={store.getShips(PLAYERS.USER)} />
      </DndProvider>
      <Board store={store} player={PLAYERS.AI} />
    </div>
  );
};

Game.displayName = 'Game';

Game.propTypes = {
  store: PropTypes.instanceOf(Store).isRequired
};

export default observer(Game);
