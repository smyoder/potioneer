/**
 * UNITS:
 * Ounces (volume)
 * Flamels (energy in mana, temperature, essence effect)
 * Degrees (flamels/ounce, magnitude of essence vector)
 *
 * The amount of mana added to a base will determine the max number of degrees of potion are allowed to be made
 * Different bases have different max mana densities
 */


/**
 * lux: sparkly, nox: wavy
 * ignis: red, gelum: cyan
 * fulgur: yellow, vis: blue
 * precantatio: magenta, vita: green
 */ 
function potionColor(vector) {
  let ig = vector[EssenceIndices.IgnisGelum];
  let vp = vector[EssenceIndices.VitaPraecantatio];
  let fv = vector[EssenceIndices.FulgurVis];
  let maxValue = Math.max(Math.abs(ig), Math.abs(vp), Math.abs(fv));
  
  let rgb = [];
}
 
class PotionBase extends Substance {
  constructor(essence, volume, manaDensity, boilingPoint) {
    super(essence, volume);
    this.manaDensity = manaDensity; // Degrees
    this.boilingPoint = boilingPoint; // Degrees
  }
  
  clone() {
    return new PotionBase(this.essence, this.volume, this.manaDensity, this.boilingPoint);
  }
  
  add(other) {
    let volSum = this.volume + other.volume;
    this.manaDensity = (this.manaDensity * this.volume + other.manaDensity * other.volume) / volSum;
    this.boilingPoint = (this.boilingPoint * this.volume + other.boilingPoint * other.volume) / volSum;
    for(let i = 0; i < 4; i++) {
      this.essence[i] = (this.essence[i] * this.volume + other.essence[i] * other.volume) / volSum;
    }
    this.volume = volSum;
  }
}

class Cauldron {
  constructor(volume, conversionRate) {
    this.heat = 0;
    this.mana = 0;
    this.potion = null;
    this.base = null;
    this.volume = volume;
    this.conversionRate = conversionRate; // Flamels/tick
    this.ingredients = [];
  }
  
  get occupiedVolume() {
    let vol = this.base == null ? 0 : this.base.volume;
    for(let i = 0; i < this.ingredients.length; i++) {
      vol += this.ingredients[i].volume;
    }
    return vol;
  }
  
  get info() {
    return `Temperature: ${this.heat}°<br/>Mana: ${this.mana}°`;
  }
  
  addBase(base) {
    let vol = Math.min(base.volume, this.volume - this.occupiedVolume);
    let oldVol = base.volume;
    base = base.clone();
    base.volume = vol;
    if(vol > 0) {
      if(this.base == null) {
        this.base = base;
      } else {
        this.base.add(base);
      }
    }
    return oldVol - vol;
  }
  
  addMana(mana) {
    let flamels = Math.min(this.base.volume * this.base.manaDensity - this.mana, mana);
    this.mana += flamels;
    return mana - flamels;
  }
  
  addHeat(heat) {
    if(this.base != null) {
      let flamels = Math.min(this.base.volume * this.base.boilingPoint - this.heat, heat);
      this.heat += flamels / this.base.volume;
      return heat - flamels / this.base.volume;
    }
  }
  
  addIngredient(ingredient) {
    let vol = Math.min(ingredient.volume, this.volume - occupiedVolume);
    this.ingredients.push(ingredient.clone());
    return ingredient.volume - vol;
  }
  
  brewTick() {
    // Get conversionRate Flamels of every ingredient
    let ingrEnergy = 0;
    for(let ingredient of this.ingredients) {
      ingrEnergy += ingredient.energy;
    }
    let processIngredients = [];
    let removeIngredients = [];
    for(let i = 0; i < this.ingredients.length; i++) {
      let ingredient = this.ingredients[i];
      let energy = ingredient.energy;
      let portion = energy / ingrEnergy;
      let processIngredient = ingredient.clone();
      processIngredient.volume += Math.min(portion * this.conversionRate / ingredient.density, ingredient.volume);
      ingredient.volume -= processIngredient.volume;
      processIngredients.push(processIngredient);
      if(ingredient.volume < 0 || floatEq(ingredient.volume, 0)) {
        removeIngredients.push(i);
      }
    }
    // Remove ingredients that were fully consumed
    for(let i = removeIngredients.length - 1; i >= 0; i--) {
      this.ingredients.splice(removeIngredients[i], 1);
    }
    
    // Combine ingredients
    let combinedEssence = [0, 0, 0, 0];
    let combinedVolume = 0;
    for(let ingredient of processIngredients) {
      cominedVolume += ingredient.volume;
      let scaledEssence = ingredient.scaledEssence;
      for(let i = 0; i < combinedEssence.length; i++) {
        combinedEssence[i] += scaledEssence[i];
      }
    }
    if(this.potion != null) {
      let scaledEssence = this.potion.scaledEssence;
      for(let i = 0; i < combinedEssence.length; i++) {
        combinedEssence[i] += scaledEssence[i];
      }
    } else {
      this.potion = new Potion();
    }
    for(let i = 0; i < combinedEssence.length; i++) {
      combinedEssence[i] /= combinedVolume;
    }
    this.potion.volume += combinedVolume;
    this.potion.essence = combinedEssence;
  }
}
