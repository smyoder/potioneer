class Container {
  constructor(name, volume, backImgId, frontImgId) {
    this.name = name;
    this.volume = volume;
    this.backImgId = backImgId;
    this.frontImgId = frontImgId;
    this.observations = {};
    this.substances = [];
    for(let i = 4; i < arguments.length; i++) {
      this.substances.push(arguments[i]);
    }
  }
}
