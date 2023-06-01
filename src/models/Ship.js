import { makeAutoObservable } from 'mobx';

import { ORIENTATION } from '../consts';

export default class Ship {
  hits = [];

  position = { x: 0, y: 0 };

  length = 0;

  orientation = ORIENTATION.HORIZONTAL; // horizontal, vertical

  constructor(settings) {
    makeAutoObservable(this);

    const { position, length, orientation } = settings;
    this.position = position;
    this.length = length;
    this.orientation = orientation;
  }

  isPositionPartOfShip(x, y) {
    if (this.orientation === ORIENTATION.HORIZONTAL) {
      return (
        x === this.position.x &&
        y >= this.position.y &&
        y <= this.position.y - this.length + 1
      );
    }
    return (
      y === this.position.y &&
      x >= this.position.x &&
      x <= this.position.x - this.length + 1
    );
  }

  hit({ x, y }) {
    if (this.isPositionPartOfShip(x, y)) {
      this.hits.push({ x, y });
      return true;
    }
    return false;
  }

  isHitAtPosition(x, y) {
    return this.hits.some(hit => x === hit.x && y === hit.y);
  }

  isDestroyed() {
    return this.hits.length === this.length;
  }
}
