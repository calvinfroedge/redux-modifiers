import expect from 'expect'
import { array, target } from '../src'
import { createAction } from 'redux-actions'

let action = createAction('TEST');

describe('Test array modifiers', ()=>{
  it('Should add the item to the array', ()=>{
    let obj = action({foo: 'bar'});
    let result = array.add([], obj);

    expect(result.length).toBe(1);
  });

  it('Should update the array item at the index', ()=>{
    let obj = action({index: 1, item: 'bop'});
    let result = array.updateByIndex(['foo', 'bar', 'baz'], obj);

    expect(result[1]).toBe('bop');
  });

  it('Should remove the array item at the index', ()=>{
    let obj = action(1);
    let result = array.removeAtIndex(['foo', 'bar', 'baz'], obj);

    expect(result.length).toBe(2);
    expect(result[1]).toBe('baz');
  });

  it('Should remove array items equal to', ()=>{
    let obj = action('foo');
    let result = array.removeEqualTo(['foo', 'bar', 'baz'], obj);

    expect(result.length).toBe(2);
    expect(result.indexOf('foo')).toBe(-1);
  });

  it('Should target a specific array', ()=>{
    let targeted = target('foo', array.add);
    let obj = action('baz');
    let state = {foo: []};
    let result = targeted(state, obj);
    expect(result.foo.length).toBe(1);
  });

  it('Should throw an error on a bad target', ()=>{
    let badTarget = target('foo', 'bop', array.add);
    let obj = action('baz');
    let state = {foo: {bar: []}};
    expect(()=>{ badTarget(state, obj) }).toThrow(Error);
  });

  it('Should update where matches', ()=>{
    let state = [
      {foo: 'bar'},
      {foo: 'baz'},
      {foo: 'bar'}
    ];

    let obj = action({
      where: {foo: 'bar'},
      updates: {foo: 'bop'}
    });

    let result = array.updateWhere(state, obj);
    expect(result[0].foo).toBe('bop');
    expect(result[1].foo).toBe('baz');
    expect(result[2].foo).toBe('bop');
  });
});
