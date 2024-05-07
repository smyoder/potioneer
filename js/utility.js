function randFloat(lower, upper) {
  return Math.random() * (upper - lower) + lower;
}

function randInt(lower, upper) {
  return Math.floor(Math.random() * (upper - lower) + lower);
}

function floatEq(f1, f2) {
  return Math.abs(f1 - f2) < 0.000001;
}

function cosSim(v1, v2) {
  var num = 0;
  var denA = 0;
  var denB = 0;
  for(let i = 0; i < v1.length; i++) {
    num += v1[i] * v2[i];
    denA += v1[i] * v1[i];
    denB += v2[i] * v2[i];
  }
  return num / (Math.sqrt(denA) * Math.sqrt(denB));
}

function vectorLength(v) {
  var sum = 0;
  for(let i = 0; i < v.length; i++) {
    sum += v[i] * v[i];
  }
  return Math.sqrt(sum);
}

function normalized(v) {
  var vLen = vectorLength(v);
  var v2 = []
  for(let i = 0; i < v.length; i++) {
    v2.push(v[i] / vLen);
  }
  return v2;
}
