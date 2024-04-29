class Inventory {
  constructor() {
    this.inventory = [];
    for(let i = 0; i < 10; i++) {
      this.inventory.push(null);
    }
  }
}

class Workstation {
}

class Shelf extends Workstation {
  constructor() {
    super();
    this.inventory = []
    for(let i = 0; i < 5; i++) {
      this.inventory.push([null, null, null, null, null]);
    }
  }
}

class CauldronStand extends Workstation {
  constructor(cauldron) {
    super();
    this.cauldron = cauldron;
  }
}