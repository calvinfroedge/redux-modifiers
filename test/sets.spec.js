import expect from 'expect'
import { set, target } from '../src'
import { createAction } from 'redux-actions'

let action = createAction('TEST');

describe('Test set modifiers', ()=>{
  it('Should add item to set and remove item from set at specified target', ()=>{
    let state = { foo: new Set([]) }
    let targeted = target('foo', set.add);
    let result = targeted(state, action('bar'));
    expect(result.foo.has('bar')).toBe(true);
    targeted = target('foo', set.remove);
    result = targeted(state, action('bar'));
    expect(result.foo.size).toBe(0);
  });
});
