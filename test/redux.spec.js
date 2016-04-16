import expect from 'expect'
import { array, target } from '../src'
import { createAction, handleActions } from 'redux-actions'
import { createStore } from 'redux'

let add = createAction('add');

const reducer = handleActions({
  'add': array.add
}, []);

describe('Test object modifiers', ()=>{
 
  var store;

  before(()=>{
    store = createStore(reducer);
  });

  it('Should add item to the reducer', ()=>{
    store.dispatch(add('foo'));
    expect(store.getState().length).toBe(1);
  });
});
