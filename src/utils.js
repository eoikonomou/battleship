import { createTheme } from '@mui/material';

import {
  SHIP_NAMES, SHIPS, TILE_LABELS, TILE_STATUS
} from './consts';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#000089',
      contrastText: 'white'
    }
  }
});

/**
 * Returns a deep copy of a json structure (object or array).
 * Does not work with unserializable data such as dates and window references.
 * @param {object|array} input - The object or array to be copied
 * @return {object|array}
 */
export const copyObject = input => JSON.parse(JSON.stringify(input));

/**
 * Returns the all the consecutive tiles starting from the target tile that can
 * accommodate the input ship.
 * @param {boolean} isHorizontal
 * @param {array<object>} grid - The player's grid data
 * @param {object} tile - Starting tile for the ship's deployment
 * @param {object} ship
 * @return {object[]} - The consecutive tiles that can be used for the ship deployment
 */
export const getAvailableTilesForShipDeployment = (isHorizontal, grid, tile, ship) => grid
  .filter(t => (isHorizontal ? (
    t.x === tile.x &&
    t.y >= tile.y &&
    t.y < tile.y + ship.health &&
    !t.shipID
  ) : (
    t.y === tile.y &&
    t.x >= tile.x &&
    t.x < tile.x + ship.health &&
    !t.shipID
  )));

const getTileLabel = (x, y) => {
  if (x === 0) {
    return TILE_LABELS.Y[y - 1];
  }
  if (y === 0) {
    return TILE_LABELS.X[x - 1];
  }
  return null;
};

/**
 * Initialise and return a grid array
 * @return {object[]}
 */
export const getDefaultGrid = () => Array(11).fill(0).reduce((grid, row, rowIndex) => ([
  ...grid,
  ...Array(11)
    .fill(0)
    .map((_, colIndex) => ({
      id: `${TILE_LABELS.X[rowIndex]}${TILE_LABELS.Y[colIndex]}`,
      x: rowIndex - 1,
      y: colIndex - 1,
      shipID: null,
      status: TILE_STATUS.NO_HIT,
      isLabel: rowIndex * colIndex === 0,
      label: getTileLabel(rowIndex, colIndex)
    }))
]), []);

/**
 * Generate an array of ship objects based on the input type and number of ships.
 * @param {string} shipType
 * @param {number} numberOfShips
 * @return {object[]}
 */
function generateShips(shipType, numberOfShips) {
  return Array(numberOfShips).fill(0).map((_, index) => ({
    id: `${shipType.slice(0, 3)} ${index}`,
    ...copyObject(SHIPS[shipType]),
    deployed: false,
    destroyed: false
  }));
}

/**
 * Generates the default ships array
 * @return {object[]}
 */
export const getDefaultShips = () => [
  ...generateShips(SHIP_NAMES.CARRIER, 1),
  ...generateShips(SHIP_NAMES.BATTLESHIP, 2),
  ...generateShips(SHIP_NAMES.CRUISER, 3),
  ...generateShips(SHIP_NAMES.DESTROYER, 4)
];
