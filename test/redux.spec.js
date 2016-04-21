import expect from 'expect'
import { reducer, push, update, updateIn, remove, removeIn } from '../src'
import { createAction as action } from 'redux-actions'
import { createStore } from 'redux'
import { List, Map } from 'immutable'

describe('Test with actual reducer', ()=>{
  var store;

  let getJSON = ()=>{
    return [
      {
        foo: 'bar',
        nested: [
          {bar: 'bop'}
        ]
      }
    ]
  }

  beforeEach(()=>{
    let testReducer = reducer({
      'push': push,
      'update': update,
      'updateIn': updateIn,
      'remove': remove,
      'removeIn': removeIn
    }, getJSON());
    store = createStore(testReducer);
  });

  it('Push should create an immutable list, with an item that is an immutable map', ()=>{
    store.dispatch(
      action('push')(
        {foo: 'bar'}
      )
    );
    let state = store.getState();
    expect(List.isList(state)).toBe(true);
    expect(Map.isMap(state.last())).toBe(true);
  });

  it('Should update a nested item with updateIn', ()=>{
    let path = [0, 'nested', 0, 'bar']
    store.dispatch(
      action('updateIn')(
        {selected: path, value: 'baz'}
      )
    );
    let state = store.getState();
    expect(state.getIn(path)).toBe('baz');
  });

  it('Should remove a nested item with removeIn', ()=>{
    let path = [0, 'nested', 0];
    store.dispatch(
      action('removeIn')(path)
    );
    let state = store.getState();
    expect(state.getIn(path)).toBe(undefined);
  });

  it('Should remove an item', ()=>{
    store.dispatch(
      action('remove')(0)
    );

    let state = store.getState();
    expect(state.size).toBe(0);
  });

  it('Should update an item with update', ()=>{
    store.dispatch(
      action('update')({
        key: 0,
        value: 'boo'
      })
    );

    let state = store.getState();
    expect(state.first()).toBe('boo');
  });
});
