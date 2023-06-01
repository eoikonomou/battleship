import './index.scss';

import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

import { DEFAULT_SHIPS } from '../../consts';
import { copyObject } from '../../utils';
import Ship from '../Ship';

const Inventory = ({ ships }) => {
  const [unusedShips, setUnusedShips] = useState(copyObject(DEFAULT_SHIPS));

  useEffect(() => {
    setUnusedShips(copyObject(DEFAULT_SHIPS)
      .filter(ship => ships.every(s => s.id !== ship.id)));
  }, [ships]);

  return (
    <div className="inventory">
      {unusedShips.map(unusedShip => (
        <Ship ship={unusedShip} />
      ))}
    </div>
  );
};

Inventory.displayName = 'Inventory';

Inventory.propTypes = {
  ships: PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
      ])
    )
  ).isRequired
};

export default Inventory;
