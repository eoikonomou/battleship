import './index.scss';

import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import { useDrag } from 'react-dnd';

import { ORIENTATION, SHIP_COLORS } from '../../consts';

const Ship = ({ ship }) => {
  const ref = useRef(null);
  const [{ isDragging, canDrag }, dragRef] = useDrag(() => ({
    type: 'ship',
    ship,
    canDrag: true,
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
      canDrag: monitor.canDrag()
    })
  }));

  const shipRef = dragRef(ref);

  return (
    <div
      ref={shipRef}
      className={clsx('ship', {
        dragging: isDragging && canDrag
      })}
      style={{
        width: ship.orientation === ORIENTATION.HORIZONTAL ? ship.size * 10 : 10,
        height: ship.orientation === ORIENTATION.HORIZONTAL ? 10 : ship.size * 10,
        backgroundColor: SHIP_COLORS[ship.name]
      }}
    />
  );
};

Ship.displayName = 'Ship';

Ship.propTypes = {
  ship: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))
    .isRequired
};

export default Ship;
