import expect from 'expect'
import { array, object, target, update } from '../src'
import { createAction, handleActions } from 'redux-actions'
import { createStore } from 'redux'

let add = createAction('add');
let updateObject = createAction('update');
let updateSimple = createAction('update_simple');
let updateEmpty = createAction('update_empty_string');
let noExist = createAction('no_exist');

const reducer = handleActions({
  'add': array.add
}, []);

const objectReducer = handleActions({
  'update': target('foo', object.update),
  'update_simple': target('foo', 'bar', update),
  'update_empty_string': target('bop', update),
  'no_exist': target('zoo', update)
}, {foo: { bar: 'baz' }, bop: ''});

describe('Test with actual reducer', ()=>{
  var store;
  var store2;

  before(()=>{
    store = createStore(reducer);
    store2 = createStore(objectReducer);
  });

  it('Should add item to the reducer', ()=>{
    store.dispatch(add('foo'));
    expect(store.getState().length).toBe(1);
  });

  it('Should update the object when using targeting', ()=>{
    store2.dispatch(updateObject({bar: 'bop'}));
    expect(store2.getState().foo.bar).toBe('bop');
  });

  it('Should update a key with a simple update', ()=>{
    store2.dispatch(updateSimple('zoo'));
    expect(store2.getState().foo.bar).toBe('zoo');
  });

  it('Should succeed in targeting with empty string', ()=>{
    store2.dispatch(updateEmpty('cool!'));
    expect(store2.getState().bop).toBe('cool!');
  });

  it('Should fail if key does not exist', ()=>{
    expect(()=>{store2.dispatch(noExist('crap!'))}).toThrow(Error);
  });
});
