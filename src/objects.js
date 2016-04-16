/**
 * Iterate over an object and replace values of keys present in payload
 */
export function update(state, action){
  let { payload } = action;

  if(typeof(payload) != 'object')
    throw new Error('payload must be an object!');

  let updated = Object.assign({}, state, payload);
  return updated;
}

/**
 * Iterate over object and make updates where matches
 */
export function updateWhere(state, action){
  let { payload } = action;
  let { where, updates } = payload;

  if(!where || !updates) throw new Error('"where" and "updates" keys must be present in updateWhere.');

  let copy = Object.assign({}, state);
  for(var key in copy){
    let item = copy[key];

    if(containsMatches(item, where)){
      copy[key] = update(item, {payload: updates});
    }
  }

  return copy;
}

/**
 * Remove a specific key
 */
export function remove(state, action){
  let { payload } = action;

  let err = ()=>{
    throw new Error('Key must be a string!');
  }

  let type = typeof(payload);

  let isArray = Array.isArray(payload);
  if(type != 'string' && !isArray){ 
    err();
  }

  let omit = {};
  if(isArray){
    for(var i=0;i<payload.length;i++) omit[payload[i]] = true;
  } else {
    omit[payload] = true;
  }

  let copy = {};
  for(var key in state){
    if(!omit[key]) copy[key] = state[key];
  }

  return copy;
}

/**
 * Check if an object matches some arguments, i.e:
 *
 * does {foo: 'bar', id: 1} match {id: 1}
 */
export function containsMatches(object, where){
  for(var key in where){
    if(object[key] != where[key]) return false;
  }

  return true;
}
