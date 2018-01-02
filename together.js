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
    }

    attr() {
        return `data-${this.attribute}`;
    }

    getElementsByStateProp(stateProp) {
        return this.parentNode.querySelectorAll(
            `[data-${this.attribute}='${stateProp}']`
        );
    }
    
    set(stateProp) {
        const els = this.getElementsByStateProp(stateProp);
        requestAnimationFrame(() => {
            for (let i = 0; i < els.length; i++) {
                let el = els[i];
                el.textContent = text;
                this.state.set(el, text);
            }
        });
    }

    size(stateProp) {
        return this.getElementsByStateProp(stateProp).length
    }

    get(stateProp) {
        const els = this.getElementsByStateProp(stateProp);
        if (els.length) {
            return this.state.get(els[0]);
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
        this.state.delete(el);
    }

    upgrade(el, stateProp) {
        el.setAttribute(this.attr(), stateProp);
        const text = this.get(stateProp)
        if (text) el.textContent = text;
    }

}