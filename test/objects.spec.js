import expect from 'expect'
import { object, target } from '../src'
import { createAction } from 'redux-actions'

let action = createAction('TEST');

describe('Test object modifiers', ()=>{
  it('Should update the object', ()=>{
    let state = { foo: '' }
    let update = action({bar: 'baz'});
    let result = object.update(state, update);
    expect(result.foo).toBe('');
    expect(result.bar).toBe('baz');
  });

  it('Should remove the value at specified key', ()=>{
    let state = { foo: 'bar' };
    let deletion = action('foo');
    let result = object.remove(state, deletion);
    expect(Object.keys(result).length).toBe(0);
  });

  it('Should remove several keys is given array format', ()=>{
    let state = { foo: 'bar', baz: 'bop' };
    let deletion = action(['foo', 'baz']);
    let result = object.remove(state, deletion);
    expect(Object.keys(result).length).toBe(0);
  });

  it('Should match via containsMatches', ()=>{
    expect(object.containsMatches({foo: 'bar', id: 1}, {id: 1})).toBe(true); 
  });

  it('Should not match if not equal', ()=>{
    expect(object.containsMatches({foo: 'bar', id: 1}, {id: 2})).toBe(false);
  });
});
