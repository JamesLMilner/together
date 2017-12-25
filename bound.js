

class Bound {
   
    constructor(parentNode, attribute) {

        this.attribute = attribute;
        this.state = new WeakMap();

        const selector = `[data-${this.attribute}="*"]`;
        this.els = parentNode.querySelector(selector);
        if (this.els) {
            this.els.forEach((el) => {
                this.state.set(el, el.innerText);
            });
        }

        // Create an observer instance linked to the callback function
        this.observer = new MutationObserver(this.observeDOM.bind(this));
        const config = { 
            attributes: true, 
            attributeFilter: [`data-${this.attribute}`],
            childList: true,
            subtree: true, // Required!
        };
        this.observer.observe(parentNode, config);
    }

    attr() {
        return `data-${this.attribute}`;
    }

    handleAttributeUpdate(mutation) {
        const stateVar = mutation.target.getAttribute(this.attr());
        this.set(stateVar, mutation.target.innerText);
    }

    handleElementUpdate(mutation) {
       // console.log('A child node has been added or removed.', mutation);
        mutation.removedNodes.forEach((el, i, obj) => {
            console.log("removed", el);
            if (el.getAttribute !== undefined) {
                const stateProp = el.getAttribute(this.attr());
                console.log("val", stateProp);
                if (stateProp) {
                    this.delete(stateProp);
                }
            }
        });

        mutation.addedNodes.forEach((el, i, obj) => {
            
            if (el.getAttribute !== undefined) {
                const stateProp = el.getAttribute(this.attr());
                console.log("val", stateProp);
                if (stateProp) {
                    this.set(stateProp, el.innerText);
                }
            }
            
        });
    }

    observeDOM(mutationsList) {
        
        // Callback function to execute when mutations are observed

        for (let mutation of mutationsList) {
            console.log(mutation.type);
            if (mutation.type == 'childList') {
                this.handleElementUpdate(mutation);
            } else if (mutation.type == 'attributes') {
                this.handleAttributeUpdate(mutation);
            }

        }

    }

    getElementByDOMState(stateProp) {
        console.log(`[data-${this.attribute}='${stateProp}']`)
        return document.querySelector(`[data-${this.attribute}='${stateProp}']`);
    }
    
    // By state
    set(stateProp, text) {
        const el = this.getElementByDOMState(stateProp);
        console.log("set", el, text)
        if (el) {
            this.state.set(el, text);
            el.innerText = text;
        }
    }

    get(stateProp) {
        const el = this.getElementByDOMState(stateProp);
        if (el) {
            this.state.get(el).innerText();
        }
    }

    delete(stateProp) {
        const el = this.getElementByDOMState(stateProp);
        if (el) {
            this.state.delete(el);
            el.remove();
        }
    }

    upgrade(el, stateProp) {
        el.setAttribute(this.attr(), stateProp);         
    }

    destroy() {
        this.state = new WeakMap();
        this.observer = undefined;
    }

}