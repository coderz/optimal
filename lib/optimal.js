function parseString(s) {
  var ret = {},
      types = {'o': 'object', 'f': 'function', 'n': 'number', 's': 'string'};

  var args = s.split(",").map(function(x) {
    var current = x.split(':'),
        type = types[current[0].trim()],
        name = current[1],
        optional = false;

    if (current.length < 2)
      throw new Error("NOTYPEDECLARED");

    if (name[0] === '[' && name[name.length-1] === ']') { // optional parameter
      optional = true;
      name = name.substring(1, name.length-1);
    }

    ret[name] = {
      optional: optional,
      type: type
    }
  });

  return ret;
}


module.exports = function(arguments, o) {
  var current, next,
      opts = (typeof o === 'string') ? parseString(o) : o,
      args = Array.prototype.slice.call(arguments),
      keys = Object.keys(opts), 
      ret = {};

  for (var i = 0; i < keys.length; i++) {
    current = keys[i];
    next = keys[i+1];

    if (!opts[current].optional) {
      ret[keys[i]] = args.shift();
    } else {
      if (opts[current].optional && opts[next] && opts[current].type === opts[next].type)
        throw new Error("CANNOT")

      if (typeof args[0] === opts[current].type)
        ret[current] = args.shift();
    }
  }

  return ret;
};