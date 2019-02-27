import { MusicSearch } from './src/elements/music-search/music-search';
import { MusicArtist } from './src/elements/music-artist/music-artist';
import { MusicError } from './src/elements/music-error/music-error';

class MusicSearch {
    constructor() {
        this.artistElement = document.querySelector('music-artist');
        this.artistErrorElement = document.querySelector('music-error');
        document.addEventListener('onTyping', (e) => this.onSearch(e));
    }


    onSearch(e) {
        const query = e.detail;

        const url = `http://localhost:4000/search`;

        this.searchMusic(url, query)
        .then(
            response => {
                const parsedData = JSON.parse(response);
                
                if (parsedData.error) {
                    this.artistErrorElement.setAttribute('error_message', parsedData.error);
                    this.artistElement.removeAttribute('tracks');
                    this.artistElement.removeAttribute('artist');

                } else {
                    this.artistErrorElement.removeAttribute('error_message');
                    this.artistElement.setAttribute('artist', parsedData.genre);
                    this.artistElement.setAttribute('tracks', response);
                }

            },
            error => window.console.error('Failed!', error)
        );

    }


    searchMusic(url, query) {
        return new Promise(
			(resolve, reject) => {
				const req = new XMLHttpRequest();
                req.open('POST', url);
                req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                

				req.onload = () => req.status == 200 ? resolve(req.response) : reject(Error(req.statusText));
				req.onerror = () => reject(Error('Network Error'));

                req.send(JSON.stringify({ "query": query.toLowerCase()}));
			}
		);
    }
}

const app = new MusicSearch();