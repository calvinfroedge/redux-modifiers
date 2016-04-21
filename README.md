# Write better Redux code faster v0.0.5

<em>Big changes from 0.0.4! API has been completely rewritten on top of [ImmutableJS](http://facebook.github.io/immutable-js).</em>

![Codeship build status](https://codeship.com/projects/857492d0-ec53-0132-251c-1a6982ed746d/status?branch=master)

A collection of generic functions on top of [ImmutableJS](http://facebook.github.io/immutable-js) and [Redux Actions](https://github.com/acdlite/redux-actions) for simplifying your reducers. Declare your reducers and state as plain old javascript objects, but take advantage of `Immutable` guarantees and data structure traversal utilities.

Example reducer:

```js
import { reducer, push, updateIn, removeIn } from 'redux-modifiers'

const reducer = reducer({
  'ADD_ITEM_TO_LIST': push,
  'UPDATE': updateIn,
  'ADD_NESTED_ITEM': (state, action)=>{
    let { selected, value } = action.payload; //Index of nested item
    return state.updateIn(selected, item => item.push(value) ); //Using ImmutableJS API
  },
  'REMOVE': removeIn
}, []);
```

You can call `toJS` on any structure you get out of the reducer to convert it back to vanilla js, i.e. in a react component where you want to use spread operators, normal object accessors, etc. Anything you put in the reducer will automatically be converted to an ImmutableJS structure, which means you can do things like adding items to state from plain javascript objects without worrying about references sticking around.

## Notes

### FSA
`redux-modifiers` does expect that actions are dispatched as [Flux Standard Actions](https://github.com/acdlite/flux-standard-action). Essentially, this means every action looks like:

```js
{
  type: YOUR_ACTION_TYPE,
  payload: YOUR_PAYLOAD
}
```

### State and ImmutableJS
`state` is converted to an `Immutable` data structure, so you are free to use any `ImmutableJS` function you like on state. If you find you perform a particular option frequently, consider submitting a *pull request* and adding it to `redux-modifiers`!

# Target specific parts of state

Sometimes, you want to work on only a very specific part of state. Use `updateIn`, to target specific parts of state, passing the update function the path that you want to update. Example state:

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

Example reducer function:

```js
'UPDATE': updateIn
```

Example dispatch:

```js
dispatch({selected: ['foo', 'name'], value: 'Calvin Froedge'});
```


# API

### push(state, action)

Payload can take any value, but you must call `push` on an array (`List` in ImmutableJS).

```js
'ADD': push
```

### updateIn(state, action)

Payload must include a selection path `selected` and a `value` or `fn`. State (or targeted key) will be replaced with value if `value`, or `fn` will be applied to the existing value.

Example payload:
```
{selected: [0, 'nested_array', 1], fn: value => value * 2}
```

### removeIn(state, action)

Payload must include a selection path. Example payload:
```
[0, 'nested_array', 1]
```
