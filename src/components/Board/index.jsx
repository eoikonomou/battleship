import './index.scss';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import clsx from 'clsx';
import { observer } from 'mobx-react-lite';
import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import { DndProvider, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { BOARD, PLAYERS } from '../../consts';
import Store from '../../Store';

const Board = ({ store, player, moveShip }) => {
  const dropSectionRef = useRef(null);
  const [{ isOver }, dropRef] = useDrop(() => ({
    accept: 'ship',
    drop: ship => moveShip(ship),
    collect: monitor => ({
      isOver: !!monitor.isOver()
    })
  }));

  const renderBoard = () => (
    <div className="battleship__board--wrapper">
      {BOARD.INDICES.map(rowIndex => (
        <Grid key={`row-${rowIndex}`} container className="battleship__board--row">
          {BOARD.INDICES.map(colIndex => (
            <BoardSquare x={rowIndex} y={colIndex} />
          ))}
        </Grid>
      ))}
    </div>
  );

  return (
    <div className="battleship__board">
      <Typography variant="h6">{player.toUpperCase()}</Typography>
      {renderBoard()}
    </div>
  );
};

Board.displayName = 'Board';

Board.propTypes = {
  store: PropTypes.instanceOf(Store).isRequired,
  player: PropTypes.string.isRequired,
  moveShip: PropTypes.func.isRequired
};

export default observer(Board);
