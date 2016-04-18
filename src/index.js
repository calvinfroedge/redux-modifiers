/**
 * Target specific parts of state
 */
export target from './target'

/**
 * Update complex data types
 */
export * as array from './arrays'
export * as set from './sets'
export * as object from './objects'

/**
 * Update targeted scalar data type, or replace entire state tree
 */
export function update(state, action){
  let { payload } = action;
  return payload;
}
