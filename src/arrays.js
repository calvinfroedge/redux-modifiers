import { update as updateObject, containsMatches } from './objects'

/**
 * Add item to array
 */
export function add(state, action){
  let { payload } = action;

  if(!payload) throw new Error('No payload received by arrayPush! Did your action include a payload?');

  return state.concat(payload);
}

/**
 * Update array value by index
 */
export function updateByIndex(state, action){
  let { payload } = action;
  let { index, item } = payload;

  return state.slice(0, index).concat(item).concat(state.slice(index + 1));
}

/**
 * Update objects in array where equal to
 *
 * TODO: support arrays in where check, i.e. update where ['foo', 'bar']
 */
export function updateWhere(state, action){
  let { payload } = action;
  let { updates, where } = payload;

  if(!where || !updates) throw new Error('"where" and "updates" keys must be present in updateWhere.');

  let copy = state.concat();

  for(var i=0;i<copy.length;i++){
    let item = copy[i];
    if(containsMatches(item, where)){
      copy[i] = updateObject(item, {payload: updates});
    }
  }

  return copy;
}

/**
 * Remove an array item at a specific index
 */
export function removeAtIndex(state, action){
  let { payload } = action;
  let index = payload;

  return state.slice(0, index).concat(state.slice(index+1));
}

/**
 * Remove items from array where value is equal to
 */
export function removeEqualTo(state, action){
  let { payload } = action;

  return state.filter((item)=>{ return item != payload });
}

/**
 * Return a blank array
 */
export function clear(state, action){
  return [];
}
