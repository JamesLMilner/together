## Together

Together is an experimental data binding library in JavaScript. 

With together you update your JavaScript state and this updates the DOM. No Virtual DOM or diffing algorithm is implemented.

## What's going on?

We use HTML data attributes to mark elements we're interested in binding our state to. We then use MutationObservers to keep the JavaScript state and DOM in sync. If the state changes we can change the content of those nodes.

At the moment it is very basic, only supporting updating the inner text of a node. It does not support inputs, or HTML attribute bindings.

## Usage


```javascript

    const bind = new Together(document.body, "bind");
    const stateProp = "example";

	const elOne = document.createElement("div");
	document.body.appendChild(el);
	bind.upgrade(el, stateProp);

    const elTwo = document.createElement("div");
    document.body.appendChild(el);
	bind.upgrade(el, stateProp);

    bind.set(stateProp, "Some example text");

    // Both elements will have there inner text set to "Some example text"

```