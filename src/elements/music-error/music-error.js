import {
    html,
    render,
    svg
} from 'lit-html';
/* eslint-disable */
export default class MusicError extends HTMLElement {

    constructor() {
        super();
        this.element;
        this.error_message = '';

        this.root = this.attachShadow({
            mode: 'open'
        });
    }
    static get is() {
        return 'music-error';
    }

    static get observedAttributes() {
        return ['error_message'];
    }

    set Error(nVal) {
        this.error_message = nVal;
    }
    get Error() {
        return this.error_message;
    }

    template() {
        return html `
        <link rel="stylesheet" type="text/css" href="./src/elements/music-error/music-error.css">
        <div>
            <p>Error: ${this.Error}</p>
        </div>
        `;
    }

    attributeChangedCallback(name, oldVal, newVal) {
            switch (name) {
                case 'error_message':
                    this.Error = newVal;
                    if (this.Error && this.Error.length > 0) {
                        this.element.style.display = 'block';
                    } else {
                        this.element.style.display = 'none';
                    }
                    render(this.template(), this.root);
                    break;
                default:
                    break;
            }
    }

    disconnectedCallback() {}

    connectedCallback() {
        render(this.template(), this.root);

        this.element = this.root.querySelector('p');
    }

}

window.customElements.define(MusicError.is, MusicError);
