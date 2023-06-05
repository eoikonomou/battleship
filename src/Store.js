import { makeAutoObservable } from 'mobx';

import {
  GAME_COMPLETION_MESSAGE,
  GAME_STATUS,
  INITIAL_MESSAGE,
  ONGOING_GAME_MESSAGES,
  ORIENTATION,
  PLAYERS,
  TILE_STATUS
} from './consts';
import {
  getAvailableTilesForShipDeployment,
  getDefaultGrid,
  getDefaultShips
} from './utils';

export default class Store {
  gameStatus = GAME_STATUS.NOT_STARTED;

  isDialogOpen = false;

  dialogTitle = '';

  dialogMsg = '';

  userShips = getDefaultShips();

  aiShips = getDefaultShips();

  userGrid = getDefaultGrid();

  aiGrid = getDefaultGrid();

  selectedShipID = null;

  orientation = ORIENTATION.HORIZONTAL;

  infoMessage = INITIAL_MESSAGE;

  currentPlayer = PLAYERS.USER;

  canRestart = false;

  constructor() {
    makeAutoObservable(this);
  }

  getGrid(player) {
    return player === PLAYERS.USER ? this.userGrid : this.aiGrid;
  }

  setIsDialogOpen(val) {
    this.isDialogOpen = val;
  }

  getNextPlayer(player) {
    return player === PLAYERS.USER ? PLAYERS.AI : PLAYERS.USER;
  }

  getShips(player) {
    return player === PLAYERS.USER ? this.userShips : this.aiShips;
  }

  setSelectedShipID(shipID) {
    this.selectedShipID = shipID;
  }

  toggleOrientation() {
    this.orientation = this.orientation === ORIENTATION.HORIZONTAL ?
      ORIENTATION.VERTICAL :
      ORIENTATION.HORIZONTAL;
  }

  /**
   * Reset ship and grid data to default for a specific player.
   * @param {number} player
   */
  resetShips(player) {
    this.setShips(getDefaultShips(), player);
    this.setGrid(getDefaultGrid(), player);
  }

  /**
   * Check if ship can be deployed to target tile.
   * A ship can be deployed if the tile has enough consecutive empty tiles to accommodate the ship.
   * @param tile
   * @param shipID
   * @param player
   * @return {boolean}
   */
  canDeployShip(tile, shipID, player) {
    if (tile.shipID || !shipID) {
      return false;
    }
    const grid = this.getGrid(player);
    const inputShip = this.getShips(player).find(ship => ship.id === shipID);
    console.log(inputShip);
    const availableGridTiles = getAvailableTilesForShipDeployment(
      this.orientation === ORIENTATION.HORIZONTAL,
      grid,
      tile,
      inputShip
    );
    console.log(availableGridTiles);
    return availableGridTiles.length === inputShip.health;
  }

  /**
   * Collect the tiles needed for the ship and deploy it
   * @param {object} tile
   * @param {string} shipID
   * @param {number} player
   */
  deployShip(tile, shipID, player) {
    const grid = this.getGrid(player);
    const inputShip = this.getShips(player).find(ship => ship.id === shipID);
    const availableGridTiles = getAvailableTilesForShipDeployment(
      this.orientation === ORIENTATION.HORIZONTAL,
      grid,
      tile,
      inputShip
    );
    availableGridTiles.forEach(t => {
      t.shipID = shipID;
    });
    inputShip.deployed = true;
    this.selectedShipID = null;
  }

  setShips(ships, player) {
    if (player === PLAYERS.USER) {
      this.userShips = ships;
    } else {
      this.aiShips = ships;
    }
  }

  setGrid(grid, player) {
    if (player === PLAYERS.USER) {
      this.userGrid = grid;
    } else {
      this.aiGrid = grid;
    }
  }

  /**
   * Use Math.random() to generate random tile coordinates.
   * Returns a randomly selected tile.
   * @param player
   * @return {object}
   */
  getRandomTile(player) {
    const randX = Math.floor(Math.random() * 10);
    const randY = Math.floor(Math.random() * 10);

    return this.getGrid(player).find(tile => tile.x === randX && tile.y === randY);
  }

  /**
   * Find a valid target tile and place the player's ship
   * @param {object} ship - The ship to be deployed
   * @param {number} player
   */
  randomiseShipPosition(ship, player) {
    while (!ship.deployed) {
      const targetTile = this.getRandomTile(player);
      if (Math.random() * 2 > 1) {
        this.toggleOrientation();
      }

      if (this.canDeployShip(targetTile, ship.id, player)) {
        this.deployShip(targetTile, ship.id, player);
      }
    }
  }

  /**
   * Place the player's ships at random locations in the grid
   * @param {number} player
   */
  randomiseShips(player) {
    this.resetShips(player);
    const ships = this.getShips(player);
    ships.forEach(ship => this.randomiseShipPosition(ship, player));
  }

  /**
   * Hit the targetTile if not already hit.
   * If the tile contains a ship then damage the ship as well.
   * If the damaged ship gets destroyed, check if all opponent ships are now destroyed
   * to complete the game.
   * @param {object} targetTile - The tile under attack
   * @param {number} opponent - The player receiving the hit
   */
  attemptHit(targetTile, opponent) {
    if (targetTile.status === TILE_STATUS.HIT) {
      return;
    }

    targetTile.status = TILE_STATUS.HIT;
    if (targetTile.shipID) {
      const opponentShips = this.getShips(opponent);
      const hitShip = opponentShips.find(ship => ship.id === targetTile.shipID);
      hitShip.health -= 1;
      if (hitShip.health === 0) {
        hitShip.destroyed = true;
        if (opponentShips.every(ship => ship.destroyed)) {
          this.completeGame(this.getNextPlayer(opponent));
          return;
        }
      }
    }
    this.startRound(opponent);
  }

  /**
   * Generate a hit attempt on a random tile
   * @param {number} opponent - The player under attack
   */
  randomiseHit(opponent) {
    let validTarget = null;
    while (!validTarget) {
      const targetTile = this.getRandomTile(opponent);
      if (targetTile.status !== TILE_STATUS.HIT) {
        validTarget = targetTile;
      }
    }
    this.attemptHit(validTarget, opponent);
  }

  /**
   * Start new round. If the player is the AI, randomise a hit.
   * @param {number} player - The active player
   */
  startRound(player) {
    this.currentPlayer = player;
    this.infoMessage = ONGOING_GAME_MESSAGES[player];
    if (player === PLAYERS.AI) {
      setTimeout(() => {
        this.randomiseHit(PLAYERS.USER);
      }, 1000);
    }
  }

  /**
   * Start the game. First randomise who plays and then start the first round.
   */
  startGame() {
    // randomise opponent ship positions
    this.randomiseShips(PLAYERS.AI);
    // start game
    this.gameStatus = GAME_STATUS.STARTED;
    const firstPlayer = Math.random() * 2 > 1 ? PLAYERS.USER : PLAYERS.AI;
    this.startRound(firstPlayer);
  }

  /**
   * Set up information message, show restart button, set up game completion dialog and show it
   * @param {number} winner
   */
  completeGame(winner) {
    const isUserVictory = winner === PLAYERS.USER;
    this.gameStatus = GAME_STATUS.COMPLETED;
    this.dialogTitle = isUserVictory ? 'VICTORY' : 'DEFEAT';
    this.dialogMsg = isUserVictory ?
      'You are victorious!\nDo you want to restart?' :
      'You lost.\nDo you want to exact your revenge?';
    this.isDialogOpen = true;
    this.infoMessage = GAME_COMPLETION_MESSAGE;
    this.canRestart = true;
  }

  /**
   * Restore state to defaults
   */
  restartGame() {
    this.aiGrid = getDefaultGrid();
    this.userGrid = getDefaultGrid();
    this.aiShips = getDefaultShips();
    this.userShips = getDefaultShips();
    this.gameStatus = GAME_STATUS.NOT_STARTED;
    this.canRestart = false;
  }

  isGameCompleted() {
    return this.gameStatus === GAME_STATUS.COMPLETED;
  }

  isGameStarted() {
    return this.gameStatus === GAME_STATUS.STARTED;
  }
}
