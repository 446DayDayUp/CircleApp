let functions = {};

exports.registerFunc = function(name, func) {
  functions[name] = func;
}

exports.executeFunc = function(name, args) {
  functions[name](...args);
}