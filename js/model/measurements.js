var measurementOrders = {
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
  
  }
}

function measure(obj, tool) {
  
}

var measurements = {
  look: function(obj, priority) {
    if(obj.hasOwnProperty("look")) {
      return obj.look;
    }
    return null;
  }
  
  color: function(obj, priority) {
    if(obj.hasOwnProperty("color")) {
      return obj.color;
    }
    return null;
  }
  
  volume: function(obj, priority) {
    if(obj.hasOwnProperty("volume")) {
      return Math.round(obj.volume, priority);
    }
  }
}
