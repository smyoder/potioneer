var observationOrders = {
  "look": 0,
  "volume": 1
}

class Observation {
  constructor(fieldName, priority, value) {
    this.fieldName = fieldName;
    this.priority = priority;
    this.value = value;
  }
}

class Tool {
  constructor(name, fieldNames, priority) {
    this.name = name;
    this.fieldNames = fieldNames;
    this.priority = priority;
  }
  
  measure(obj) {
    for(let fieldName of this.fieldNames) {
      if(fieldName in observationValues) {
        let observation = new Observation(fieldName, this.priority, observationValues[fieldName](obj, this.priority));
        if(observation !== null) {
          let other = null;
          if(fieldName in obj.observations) {
            other = obj.observations[fieldName];
          }
          if(other === null || other.priority < observation.priority) {
            obj.observations[fieldName] = observation;
          }
        }
      }
    }
  }
}

var observationValues = {
  appearance: function(obj, priority) {
    if("appearance" in obj) {
      return obj.appearance;
    }
    return null;
  },
  
  volume: function(obj, priority) {
    if("volume" in obj) {
      return `${Math.round(obj.volume, priority)} oz.`;
    }
  }
}
