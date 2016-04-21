import Immutable from 'immutable'
import { handleActions } from 'redux-actions'
import { checkPayload, checkUpdate, modifier, isUndefined } from './utility'

/**
 * Create a reducer
 */
export function reducer(handlers, state){
  return handleActions(handlers, Immutable.fromJS(state));
}

/**
 * Push item to state 
 */
export function push(state, action){
  checkPayload(action);

  let value = action.payload;
  return state.push(Immutable.fromJS(value));
}

/**
 * Update a specific key or index
 */
export function update(state, action){
  checkPayload(action);
  checkUpdate(action);

  let { key, value, fn } = action.payload;

  if(isUndefined(key)) throw new Error('"key" must be present in payload!');

  return state.update(key, modifier(value, fn));
}

/**
 * Update at a selection path
 */
export function updateIn(state, action){
  checkPayload(action);
  checkUpdate(action);

  let { selected, value, fn } = action.payload;

  if(isUndefined(selected)) throw new Error('"selected" must be present in payload!');

  return state.updateIn(selected, modifier(value, fn));
}

/**
 * Remove a specific index or key
 */
export function remove(state, action){
  checkPayload(action);

  return state.remove(action.payload);
}

/**
 * Remove at a selection path
 */
export function removeIn(state, action){
  checkPayload(action);

  return state.removeIn(action.payload);
}
