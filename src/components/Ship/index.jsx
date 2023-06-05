import './index.scss';

import clsx from 'clsx';
import { observer } from 'mobx-react-lite';
import PropTypes from 'prop-types';
import React, { useEffect, useRef } from 'react';

import { ORIENTATION } from '../../consts';
import Store from '../../Store';

const Ship = ({ ship, store }) => {
  const shipRef = useRef(null);
  const { selectedShipID, orientation } = store;

  const toggleShip = () => {
    if (selectedShipID === ship.id) {
      store.setSelectedShipID(null);
    } else {
      store.setSelectedShipID(ship.id);
    }
  };

  const isHorizontal = orientation === ORIENTATION.HORIZONTAL;

  useEffect(() => {
    shipRef.current.style.setProperty(
      '--ship-width',
      isHorizontal ? ship.health : 1
    );
    shipRef.current.style.setProperty(
      '--ship-height',
      isHorizontal ? 1 : ship.health
    );
  }, [orientation]);

  return (
    <button
      ref={shipRef}
      type="button"
      className={clsx('ship', {
        selected: selectedShipID === ship.id,
        horizontal: isHorizontal,
        vertical: !isHorizontal
      })}
      onClick={toggleShip}
    >
      {ship.id}
    </button>
  );
};

Ship.displayName = 'Ship';

Ship.propTypes = {
  ship: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string, PropTypes.number, PropTypes.bool
  ])).isRequired,
  store: PropTypes.instanceOf(Store).isRequired
};

export default observer(Ship);
