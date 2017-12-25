## Bound

An experimental data binding library in JavaScript. 

Update your JavaScript state, this updates the DOM. No virtual DOM diffing is implemented.

## What's going on?

We use HTML data attributes to mark elements we're interested in binding our state to. We then use MutationObservers to keep the state and DOM in sync. If the state changes we can change the content of those nodes.