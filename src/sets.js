//Note: Set utils are probably only useful in cases where insertions and deletions are infrequent, but membership tests are very frequent

/**
 * Add new items to a set
 */
export function add(state, action){
  let set = new Set(Array.from(state));
  let { payload } = action;

  set.add(payload);
  return set;
}

/**
 * Remove item from a set
 */
export function remove(state, action){
  let set = new Set(Array.from(state));
  let { payload } = action;

  set.delete(payload);
  return set;
}
