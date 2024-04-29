const EssenceIndices = {
  IgnisGelum:0,
  VitaPraecantatio:1,
  FulgurVis:2,
  LuxNox:3
}

const PotionEffects = {
  "Warming": [1, 0, 0, 0],
  "Cooling": [-1, 0, 0, 0],
  "Healing": [0, 1, 0, 0],
  "Poison": [0, -1, 0, 0],
  "Speed": [0, 0, 1, 0],
  "Strength": [0, 0, -1, 0],
  "Night Vision": [0, 0, 0, 1],
  "Blindness": [0, 0, 0, -1],
  
  "Shadow Clone": [0, 0, -1, -1],
  "Glow": [0, 0, -1, 1],
  "Mind wipe": [0, 0, 1, -1],
  "Fast Perception": [0, 0, 1, 1],
  "Astral Travel": [0, -1, 0, -1],
  "Mana Up": [0, -1, 0, 1],
  "Sleep": [0, 1, 0, -1],
  "Wake": [0, 1, 0, 1],
  "Paralysis": [-1, 0, 0, -1],
  "Intelligence": [-1, 0, 0, 1],
  "Fortitude": [1, 0, 0, -1],
  "Charisma": [1, 0, 0, 1],
  "Flight": [0, -1, -1, 0],
  "Divination": [0, -1, 1, 0],
  "HP Up": [0, 1, -1, 0],
  "Restoration": [0, 1, 1, 0],
  "Weakness": [-1, 0, -1, 0],
  "Painkiller": [-1, 0, 1, 0],
  "Wall Climbing": [1, 0, -1, 0],
  "Water Breathing": [1, 0, 1, 0],
  "Magic Resistance": [-1, -1, 0, 0],
  "Youth": [-1, 1, 0, 0],
  "XRay Vision": [1, -1, 0, 0],
  "Love": [1, 1, 0, 0]
}

const ReleaseTime = {
  Instant: 0,
  Minutes: 1,
  Hours: 2,
  Days: 3,
  Weeks: 4,
  Months: 5,
  Years: 6
}

class Potion extends Substance {
  constructor() {
    super([0, 0, 0, 0], 0);
  }
}