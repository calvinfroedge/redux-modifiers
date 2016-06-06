import Immutable from 'immutable'

export function isUndefined(check){
  return typeof(check) == 'undefined';
}

export function checkPayload(action){
  if(isUndefined(action.payload)) throw new Error("Action must contain a payload!");
}

export function checkUpdate(action){
  let { payload } = action;
  let { value, fn } = payload;

  if(isUndefined(value) && isUndefined(value)) throw new Error("Either 'value' or 'fn' must be present in payload!");

  if(!isUndefined(value) && !isUndefined(fn)) throw new Error("Both 'value' and 'fn' cannot be present in payload!");
}

export function modifier(value, fn){
  return !isUndefined(value) ? val => Immutable.fromJS(value) : fn;
}
