# Write better Redux code faster

A collection of generic functions for operating on various data structures in your Redux state tree. The hope is you can avoid writing code for reducers except in very special cases. It has no external dependencies.

When writing your reducers, you simply use API functions as follows (super simple example, working with an array), instead of writing every method in the reducer from scratch:

```js
const reducer = handleActions({
  'ADD': array.add,
  'REMOVE': array.removeAtIndex,
  'REMOVE_WHERE': array.removeWhere
}, []);

```

You can even target specific parts of state:

```js
'UPDATE_FOO': target('key', 'subkey', object.update)
```

You would then dispatch actions that look like this:

```js
import { createAction } from 'redux-actions'

let addItem = createAction('ADD');
dispatch(addItem({'foo': 'bar', id: 1}));

let removeItem = createAction('REMOVE');
dispatch(removeItem(0));

let removeItemWhere = createAction('REMOVE_WHERE');
dispatch(removeItemWhere({foo: 'bar'}));
```

## Notes
`handleActions` and `createAction` come from [https://github.com/acdlite/redux-actions](https://github.com/acdlite/redux-actions). You don't need to use it to use `redux-modifiers`, but it's a nice library.

`redux-modifiers` does expect that actions are dispatched as [Flux Standard Actions](https://github.com/acdlite/flux-standard-action). Essentially, this means every action looks like:

```js
{
  action: YOUR_ACTION_TYPE,
  payload: YOUR_PAYLOAD
}
```

# Target specific parts of state

Sometimes, you want to work on only a very specific part of state. For instance, you may want to push a new item to an array inside of an object:

```js
{
  foo: [
    {
      id: 1,
      name: 'Calvin'
    }
  ]
}
```

How do you do this? Easy. Your reducer should look something this:

```js
'ADD_FOO_ITEM': target('foo', array.add);
```

Now, what if you want to update the `name` in the array item where the id is `1`?

```js
'UPDATE_FOO_ITEM': target('foo', array.updateWhere)
```

Your payload should look like...

```js
{ where: {id: 1}, updates: {name: 'Calvin Froedge'} }
```

What if the nesting is even more complicated?

```js
{
  foo: {
    bar: {
      baz: {
        hoohaw: 'brew'
      },
      bop: {

      }
    }
  }
}
```

Same API...

```js
'UPDATE_BAZ_OF_BAR': target('foo', 'bar', 'baz', object.update)
```

Payload:

```js
{ hoohaw: 'boo' }
```

# API

## Array Methods 

### add(state, action)

Payload can contain any kind of value.

### updateByIndex(state, action)

Payload should be an object containing `index` and `item`. `item` is the value which will replace the current value.

### updateWhere(state, action)

Payload should contain `updates` and `where`.

### removeAtIndex(state, action)

Payload should contain an integer (the index).

### removeEqualTo(state, action)

Payload can contain any value you want to filter on.

### clear(state, action).

Empty the array. Payload should be omitted.

## Object Methods

### update(state, action)

Will update all keys in state with the values of keys found in the object provided in payload.

### updateWhere(state, action)

Expects `updates` and `where` in payload. Will apply updates anywhere `where` matches.

### remove(state, action)

Takes either a single string as the payload, or an array of strings. The keys corresponding to those strings will be removed from state.

### containsMatches(object, where)

A utility function which should not be called by reducers to modify state. It is used to figure out whether or not `{id: 1, foo: 'bar'}` would match `{foo: 'bar'}` (it should).

## Set Methods

Sets provide a favorable data structure to use when membership needs to be tested in a large group. For instance, `set.has('item')`.

### add(state, key)

Payload is any item you want to add to set.

### remove(state, key)

Payload is any item you want to remove from set.
