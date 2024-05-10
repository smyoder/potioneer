class Substance {
  constructor(essence, form, color, volume, imgSrc) {
    this.essence = essence;
    this.form = form;
    this.color = color;
    this.volume = volume;
    this.imgSrc = imgSrc;
    this.observations = {};
  }
  
  get energy() {
    return this.density * this.volume;
  }
  
  get density() {
    return vectorLength(this.essence);
  }
  
  get scaledEssence() {
    let sE = [];
    for(let i = 0; i < this.essence.length; i++) {
      sE.push(this.essence[i] * this.volume);
    }
  }
  
  decompose() {
    var components = [];
    var sum = 0;
    for(let i = 0; i < this.essence.length; i++) {
      sum += this.essence[i];
    }
    for(let i = 0; i < this.essence.length; i++) {
      var newEssence = [0, 0, 0, 0];
      newEssence[i] = this.essence[i] / this.volume * newVolume;
      var newVolume = this.volume * this.essence[i] / sum;
      
      components.push(new Essence(newEssence, newVolume));
    }
    return components;
  }
  
  clone() {
    return new Substance(Array.from(this.essence), this.volume, this.imgSrc);
  }
  
  get appearance() {
    return `A ${this.color} ${this.form}.`;
  }
  
  get description() {
    let desc = this.name;
    for(let key in this.observations) {
      desc += "<br/>" + this.observations[key].value;
    }
    return desc;
  }
}

class Ingredient extends Substance {
  constructor(essence, form, color, volume, name, pureEssence, imgSrc) {
    super(essence, form, color, volume, imgSrc);
    this.name = name;
    this.essence = essence;
    this.quality = cosSim(essence, pureEssence);
  }
  
  clone() {
    let other = new Ingredient(this.essence, this.volume, this.name, [0, 0, 0, 0], this.imgSrc);
    other.quality = this.quality;
  }
}

function generateImpurity(impurity, pureEssence) {
  let impureVector = [];
  for(let i = 0; i < pureEssence.length; i++) {
    impureVector.push(randFloat(0, impurity) + pureEssence[i]);
  }
  let essLen = vectorLength(pureEssence);
  impureVector = normalized(impureVector);
  for(let i = 0; i < impureVector.length; i++) {
    impureVector *= essLen;
  }
  return impureVector;
}

class RawIngredient extends Ingredient {
  constructor(name, form, color, volume, impurity, pureEssence, imgSrc) {
    super(generateImpurity(impurity, pureEssence), form, color, volume, name, pureEssence, imgSrc);
  }
}

/**************************************Plants***************************************/
class Plant extends RawIngredient {
  constructor(name, volume, impurity, pureEssence, pureImpurity) {
    super(name, volume, impurity, pureEssence, pureImpurity);
  }
}

class Wintergreen extends Plant {
  constructor(volume, impurity) {
    super("Wintergreen", volume, impurity, [-1, 0, 0.5, 0]);
  }
}

class Nightshade extends Plant {
  constructor(volume, impurity) {
    super("Nightshade", volume, impurity, [-0.3, 0, 0, -1], [-0.3, -1, 0.2, 1]);
  }
}

class Panacea extends Plant {
  constructor(volume, impurity) {
    super("Panacea", volume, impurity, [0.3, 1, 0, 0], [-0.3, -0.5, -0.3, -0.2]);
  }
}

class Starfruit extends Plant {
  constructor(volume, impurity) {
    super("Starfruit", volume, impurity, [0, -1, 0, 0.3], [0.3, 0.5, 0.2, -0.6]);
  }
}

/**************************************Bugs***************************************/
class Bug extends RawIngredient {
  constructor(name, volume, impurity, pureEssence, pureImpurity) {
    super(name, volume, impurity, pureEssence, pureImpurity);
  }
}

class FireAnt extends Bug {
  constructor(volume, impurity) {
    super("Fire Ants", volume, impurity, [1, 0, -0.3, 0], [-0.5, 0.5, -0.2, 0.2]);
  }
}

class LightningBug extends Bug {
  constructor(volume, impurity) {
    super("Lightning Bugs", volume, impurity, [0, 0, 1, 0.5], [0.5, 0.2, -0.5, 0.5]);
  }
}

class GlowWorm extends Bug {
  constructor(volume, impurity) {
    super("Glow Worms", volume, impurity, [0, -0.3, 0, 1], [0.5, 0.2, 0.3, -0.5]);
  }
}

class RhinoBeetle extends Bug {
  constructor(volume, impurity) {
    super("Rhino Beetles", volume, impurity, [0, 0, -1, -0.5], [-0.2, -0.3, 0.5, 0.5]);
  }
}
