export const SHIP_NAMES = {
  BATTLESHIP: 'battleship',
  CARRIER: 'carrier',
  CRUISER: 'cruiser',
  DESTROYER: 'destroyer'
};

export const ORIENTATION = {
  VERTICAL: 0,
  HORIZONTAL: 1
};

export const TILE_LABELS = {
  X: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'],
  Y: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
};

export const PLAYERS = {
  USER: 0,
  AI: 1
};

export const GAME_STATUS = {
  NOT_STARTED: 0,
  STARTED: 1,
  COMPLETED: 2
};

export const TILE_STATUS = {
  NO_HIT: 0,
  HIT: 1
};

export const PLAYER_LABEL = ['USER', 'AI'];

export const SHIPS = {
  [SHIP_NAMES.CARRIER]: {
    name: SHIP_NAMES.CARRIER, health: 5
  },
  [SHIP_NAMES.BATTLESHIP]: {
    name: SHIP_NAMES.BATTLESHIP, health: 4
  },
  [SHIP_NAMES.CRUISER]: {
    name: SHIP_NAMES.CRUISER, health: 3
  },
  [SHIP_NAMES.DESTROYER]: {
    name: SHIP_NAMES.DESTROYER, health: 2
  }
};

export const ONGOING_GAME_MESSAGES = [
  'Your turn, attack!',
  'Opponent\'s turn, brace yourself Admiral!'
];

export const INITIAL_MESSAGE = 'Place your ship to begin!';

export const GAME_COMPLETION_MESSAGE = 'Game finished. Press on the restart button to start over.';
