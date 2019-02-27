import {
    html,
    render,
    svg
} from 'lit-html';
/* eslint-disable */
export default class MusicSearch extends HTMLElement {

    constructor() {
        super();
        this.placeholder = 'Search...';
        this.element;

        this.root = this.attachShadow({
            mode: 'open'
        });
    }
    static get is() {
        return 'music-search';
    }

    static get observedAttributes() {
        return ['placeholder'];
    }

    set Placeholder(nVal) {
        this.placeholder = nVal;
    }
    get Placeholder() {
        return this.placeholder;
    }

    get SearchIcon() {
        return html`
            <svg width="22px" height="22px" viewBox="0 0 22 22" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g id="Macbook-pro-15" transform="translate(-313.000000, -61.000000)" stroke="#C2CAD8">
                    <g id="Group-3" transform="translate(290.000000, 42.000000)">
                        <g id="Group" transform="translate(24.000000, 20.000000)">
                            <g id="Group-11">
                                <rect id="Rectangle" transform="translate(18.411672, 18.535060) rotate(47.000000) translate(-18.411672, -18.535060) " x="15.9116719" y="18.5350603" width="5" height="1"></rect>
                                <circle id="Oval" cx="9.5" cy="9.5" r="9.5"></circle>
                            </g>
                        </g>
                    </g>
                </g>
            </g>
            </svg>
        `
    }

    template() {
        return html `
        <link rel="stylesheet" type="text/css" href="./src/elements/music-search/music-search.css">
        <div class="search-container">
            <i>${this.SearchIcon}</i>    
            <input type="text" placeholder="${this.Placeholder}">
        </div>
        `;
    }

    attributeChangedCallback(name, oldVal, newVal) {
            switch (name) {
                case 'placeholder':
                    this.Placeholder = newVal;
                    break;
                default:
                    break;
            }
    }

    disconnectedCallback() {}

    connectedCallback() {
        render(this.template(), this.root);

        this.element = this.root.querySelector('input');

        this.element.addEventListener('keyup', _ => this.onTyping())
    }

    onTyping() {
        const text = this.element.value;
        document.dispatchEvent(new CustomEvent('onTyping', {bubbles: true, isTrusted:true, detail: text}));
    }
}

window.customElements.define(MusicSearch.is, MusicSearch);
