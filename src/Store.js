import { makeAutoObservable } from 'mobx';

import { PLAYERS } from './consts';
import Ship from './models/Ship';

export default class Store {
  isGameStarted = false;

  isDialogOpen = false;

  dialogTitle = '';

  dialogMsg = '';

  userShips = [];

  aiShips = [];

  constructor() {
    makeAutoObservable(this);
  }

  /* Setters */
  setIsGameStarted(val) {
    this.isGameStarted = val;
  }

  setIsDialogOpen(val) {
    this.isDialogOpen = val;
  }

  setDialogOptions({ dialogTitle, dialogMsg }) {
    this.dialogTitle = dialogTitle;
    this.dialogMsg = dialogMsg;
  }

  /**
   * Adds ship to the appropriate player
   * @param {object} ship - The ship data
   * @param {string} player - The player type
   */
  addShip(ship, player) {
    const shipModel = new Ship(ship);

    if (player === PLAYERS.USER) {
      this.userShips.push(shipModel);
    } else {
      this.aiShips.push(shipModel);
    }
  }

  isPositionOccupied(x, y, player) {
    if (player === PLAYERS.USER) {
      return this.userShips.some(ship => ship.isPositionPartOfShip(x, y));
    }
    return this.aiShips.some(ship => ship.isPositionPartOfShip(x, y));
  }

  getShipAtPosition(x, y, player) {
    const ships = this.getShips(player);
    return ships.find(ship => ship.isPositionPartOfShip(x, y));
  }

  isShipHitAtPosition(x, y, player) {
    const ship = this.getShipAtPosition(x, y, player);
    return ship?.isHitAtPosition(x, y) ?? false;
  }

  /* Views */
  getShips(player) {
    return player === PLAYERS.USER ? this.userShips : this.aiShips;
  }
}
