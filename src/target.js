function select(obj, args) {
  var res = obj;
  for (var i=0; i<args.length; i++) { 
    res = res[args[i]]; 
    if(typeof(res) == 'undefined') throw new Error(`${args[i]} is not a key!`);
  }
  return res;
}

function assign(obj, args, value) {
  var res = obj;
  for (var i=0; i<args.length - 1; i++) { res = res[args[i]]; }
  var x = args[args.length-1];
  res[x] = value;
}

export default function target(...args){
  let func = args.pop();

  if(typeof(func) != 'function') throw new Error('last argument to traverse must be a function.');

  return (state, action)=>{
    if(typeof(state) != 'object') throw new Error('state must be an object!');

    let copy = Object.assign({}, state);
    let targeted = select(copy, args);
    let value = func(targeted, action);
    assign(copy, args, value);

    return copy;
  }
}
