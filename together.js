export class Together {
   
    constructor(parentNode, attribute, subtree) {

        this.parentNode = parentNode;
        this.attribute = attribute || "bind";
        this.state = new WeakMap();

        const els = parentNode.querySelectorAll(
            `[data-${this.attribute}="*"]`
        );

        for (let i = 0; i < els.length; i++) {
            this.state.set(els[i], el.textContent);
        };

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
                    for (let i = 0; i < mutation.removedNodes.length; i++) {
                        const el = mutation.addedNodes[i];
                        if (el && el.getAttribute !== undefined) {
                            const stateProp = el.getAttribute(this.attr());
                            if (stateProp) {
                                this.delete(stateProp);
                            }
                        }
                    }

                    for (let j = 0; j < mutation.addedNodes.length; j++) {
                        const el = mutation.addedNodes[j];
                        if (el && el.getAttribute !== undefined) {
                            const stateProp = el.getAttribute(this.attr());
                            if (stateProp) {
                                this.set(stateProp, el.textContent);
                            }
                        } 
                    }

                    break;
                case 'attributes':
                    const stateVar = mutation.target.getAttribute(this.attr());
                    mutation.target.textContent = this.get(stateVar);
            }
        }

    }

    getElementsByStateProp(stateProp) {
        return this.parentNode.querySelectorAll(
            `[data-${this.attribute}='${stateProp}']`
        );
    }
    
    set(stateProp, text) {
        const els = this.getElementsByStateProp(stateProp);
        requestAnimationFrame(() => {
            for (let i = 0; i < els.length; i++) {
                let el = els[i];
                this.state.set(el, text);
                el.textContent = text;
            }
        });
    }

    get(stateProp) {
        const els = this.getElementsByStateProp(stateProp);
        if (els.length) {
            return this.state.get(els[0]) || "";
        }
    }

    delete(stateProp) {
        const els = this.getElementsByStateProp(stateProp);
        requestAnimationFrame(() => {
            for (let i = 0; i < els.length; i++) {
                let el = els[i];
                this.state.delete(el);
                el.remove();
            }
        });
        
    }

    downgrade(el) {
        el.removeAttribute(this.attr());
    }

    upgrade(el, stateProp) {
        el.setAttribute(this.attr(), stateProp);         
    }

}