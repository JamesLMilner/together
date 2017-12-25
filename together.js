export class Together {
   
    constructor(parentNode, attribute, subtree) {

        this.parentNode = parentNode;
        this.attribute = attribute;
        this.state = new WeakMap();

        const selector = `[data-${this.attribute}="*"]`;
        const els = parentNode.querySelector(selector);
        if (els) {
            els.forEach((el) => {
                this.state.set(el, el.textContent);
            });
        }

        this.observer = new MutationObserver(this.observeDOM.bind(this));
        this.observer.observe(parentNode, { 
            attributes: true, 
            attributeFilter: [`data-${this.attribute}`],
            childList: true,
            subtree: subtree !== false ? true : false, // Required!
        });

    }

    attr() {
        return `data-${this.attribute}`;
    }

    observeDOM(mutationsList) {
        
        for (let mutation of mutationsList) {
            switch (mutation.type) {
                case 'childList':
                    mutation.removedNodes.forEach((el, i, obj) => {
                        if (el.getAttribute !== undefined) {
                            const stateProp = el.getAttribute(this.attr());
                            if (stateProp) {
                                this.delete(stateProp);
                            }
                        }
                    });

                    mutation.addedNodes.forEach((el, i, obj) => { 
                        if (el.getAttribute !== undefined) {
                            const stateProp = el.getAttribute(this.attr());
                            if (stateProp) {
                                this.set(stateProp, el.textContent);
                            }
                        } 
                    });
                    break;
                case 'attributes':
                    const stateVar = mutation.target.getAttribute(this.attr());
                    mutation.target.textContent = this.get(stateVar);
            }
        }

    }

    getElementByDOMState(stateProp) {
        return this.parentNode.querySelectorAll(
            `[data-${this.attribute}='${stateProp}']`
        );
    }
    
    set(stateProp, text) {
        const els = this.getElementByDOMState(stateProp);
        if (els.length) {
            requestAnimationFrame(() => {
                els.forEach((el) => {   
                    this.state.set(el, text);
                    el.textContent = text;
                });
            });
        }
    }

    get(stateProp) {
        const els = this.getElementByDOMState(stateProp);
        if (els.length) {
            return this.state.get(els[0]) || "";
        }
    }

    delete(stateProp) {
        const els = this.getElementByDOMState(stateProp);
        if (els.length) {
            requestAnimationFrame(() => {
                els.forEach((el) => {
                    this.state.delete(el);
                    el.remove();
                });
            });
        }
    }

    upgrade(el, stateProp) {
        el.setAttribute(this.attr(), stateProp);         
    }

}