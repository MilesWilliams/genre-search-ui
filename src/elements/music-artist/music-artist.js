import {
    html,
    render,
    svg
} from 'lit-html';
/* eslint-disable */
export default class MusicArtist extends HTMLElement {

    constructor() {
        super();
        this.titleElement;
        this.trackListContainer
        this.trackList;
        this.tracks;
        this.placeholder;
        this.artist = '';
        this.root = this.attachShadow({
            mode: 'open'
        });
    }
    static get is() {
        return 'music-artist';
    }

    static get observedAttributes() {
        return ['tracks', 'artist'];
    }

    set Artist(nVal) {
        this.artist = nVal;
    }
    get Artist() {
        return this.artist_name;
    }

    set Tracks(nVal) {
        this.tracks = nVal;
    }
    get Tracks() {
        return this.tracks;
    }

    template() {
        return html `
        <link rel="stylesheet" type="text/css" href="./src/elements/music-artist/music-artist.css">
        <div class="artist-card">
            <div class="results-container">
                <h1>Top Results</h1>
                <h2>Genre: ${this.artist}</h2>
                <h2>Results: ${this.getTrackCount(this.Tracks)} tracks</h2>
                <ul></ul>
            </div>

            <div class="placeholder"><p>Do a search to see tracks</p></div>
        </div>
        `;
    }

    attributeChangedCallback(name, oldVal, newVal) {
            switch (name) {
                case 'artist':
                    this.Artist = newVal;
                    if (newVal && newVal.length > 0) {
                        if (this.titleElement)
                            this.titleElement.style.display = "block";
                    } else {
                        this.titleElement.style.display = "none";
                    }
                    render(this.template(), this.root);
                    break;
                case 'tracks':
                    const payload = JSON.parse(newVal)
                    this.Tracks = payload.tracks;
                    if (payload && payload.tracks.length > 0) {
                        this.placeholder.style.display = "none";
                        this.trackListContainer.style.display = "block";
                        this.trackList.innerHTML = this.buildTrackList(payload['tracks']);
                    } else {
                        this.placeholder.style.display = "block";
                        this.trackListContainer.style.display = "none";
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

        this.placeholder = this.root.querySelector('.placeholder');
        this.trackList = this.root.querySelector('ul');
        this.titleElement = this.root.querySelector('h1');
        this.trackListContainer = this.root.querySelector('.results-container');
    }

    buildTrackList(tracks) {
        if (tracks && tracks.length > 0) {
            let liElements = '';
            
            tracks.forEach(t => {
                let li = "<li>";
                if (t.src) {
                    li += `<a href="${t.src.id}" target="_blank">`
                }
                if (t.img) {
                    li += `<img src="${t.img}">`
                }
                
                li += `<span>${t.name}</span>`;

                if (t.lov) {
                    li += `
                        <div class="liked-count">
                            <i>${this.getLikedIcon}</i>
                            ${t.lov.length}
                        </div>
                    `
                }
                
                if (t.src) {
                    li += `</a>`
                }
                
                li += "</li>"

                liElements += li;
            });

            return liElements;
        }
    }

    getTrackCount(tracks) {
        if (tracks) {
            return tracks.length;
        } else {
            return 0;
        }
    }

    get getLikedIcon() {
        return `
        <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="20" height="20" viewBox="0 0 20 20">
            <path d="M9.5 19c-0.276 0-0.5-0.224-0.5-0.5 0-2.179-2.003-3.569-4.124-5.040-1.162-0.806-2.363-1.639-3.278-2.641-1.075-1.177-1.598-2.426-1.598-3.819 0-2.757 2.243-5 5-5 1.977 0 3.689 1.153 4.5 2.821 0.811-1.669 2.523-2.821 4.5-2.821 1.337 0 2.592 0.518 3.535 1.459 0.945 0.943 1.465 2.2 1.465 3.541 0 1.392-0.523 2.641-1.598 3.819-0.915 1.002-2.116 1.836-3.278 2.641-2.121 1.472-4.124 2.861-4.124 5.040 0 0.276-0.224 0.5-0.5 0.5zM5 3c-2.206 0-4 1.794-4 4 0 2.554 2.159 4.052 4.446 5.638 1.607 1.115 3.253 2.257 4.054 3.811 0.802-1.555 2.448-2.697 4.054-3.811 2.286-1.586 4.446-3.084 4.446-5.638 0-2.206-1.794-4-4-4s-4 1.794-4 4c0 0.276-0.224 0.5-0.5 0.5s-0.5-0.224-0.5-0.5c0-2.206-1.794-4-4-4z" fill="#000000"></path>
        </svg>
        `
    }
}

window.customElements.define(MusicArtist.is, MusicArtist);
