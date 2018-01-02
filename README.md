## Together

Together is an experimental one way data binding library in JavaScript. 

With Together you update your JavaScript state and this updates the DOM. No Virtual DOM or diffing algorithm is implemented.

## What's going on?

We use HTML data attributes to mark elements we're interested in binding our state to. Updating the state in forever will update all nodes marked with that attribute name.

At the moment Together meets a very basic usecase, only supporting updating the inner text of a node. It does not support inputs, HTML attributes, styles etc.

## Usage


```javascript

    // The parent node with children with data bindings 
    const bind = new Together(document.body); 
    const stateProp = "example";

    const elOne = document.createElement("div");
    document.body.appendChild(el);
    bind.upgrade(el, stateProp);

    const elTwo = document.createElement("div");
    document.body.appendChild(el);

    // We use our together object to upgdate the element
    bind.upgrade(el, stateProp);

    // We can set the inner text of our new elements
    bind.set(stateProp, "Some example text");

    // Both elements will have there inner text set to "Some example text"

```