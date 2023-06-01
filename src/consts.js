export const ORIENTATION = {
  VERTICAL: 'vertical',
  HORIZONTAL: 'horizontal'
};

export const PLAYERS = {
  USER: 'user',
  AI: 'ai'
};

export const DEFAULT_SHIPS = [
  { id: 'carrier', name: 'carrier', size: 5 },
  { id: 'battleship1', name: 'battleship', size: 4 },
  { id: 'battleship2', name: 'battleship', size: 4 },
  { id: 'cruiser1', name: 'cruiser', size: 3 },
  { id: 'cruiser2', name: 'cruiser', size: 3 },
  { id: 'cruiser3', name: 'cruiser', size: 3 },
  { id: 'destroyer1', name: 'destroyer', size: 2 },
  { id: 'destroyer2', name: 'destroyer', size: 2 },
  { id: 'destroyer3', name: 'destroyer', size: 2 },
  { id: 'destroyer4', name: 'destroyer', size: 2 }
];

export const BOARD = {
  LABELS: ['', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'],
  INDICES: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
};

export const SHIP_COLORS = {
  carrier: 'red',
  battleship: 'blue',
  cruiser: 'green',
  destroyer: 'brown'
};
