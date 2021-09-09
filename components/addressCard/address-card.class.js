const addressTemplate = document.createElement("template");
addressTemplate.innerHTML = `
    <style>
        @import url('http://${location.host}/postserver-webkcomponent/components/addressCard/address-card.css');
    </style>

    <div class="container">
        <form onsubmit="return false;" method="POST">
            <input id="search_plz" min="0" placeholder="PLZ" type="number" >
            <input id="search_city" placeholder="Stadt" type="text" >
            <input id="search_street" placeholder="Straße" type="search" autocomplete="off">
            <datalist id="streets_preview"></datalist>
            <input id="search_nr" min="1" placeholder="Hausnummer" type="text" >
            <input value="DE - Deutschland" disabled >
        </form>
    </div>
`;
// /postserver-webkcomponent
const CORS_URL = "https://cors-anywhere.herokuapp.com/";
const URL_Server = "https://www.postdirekt.de/plzserver/PlzAjaxServlet?";

class AddressCard extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(addressTemplate.content.cloneNode(true));

    }

    async searchPlz() {
        let plz = this.shadowRoot.querySelector('#search_plz');

        let response = await fetch(CORS_URL + URL_Server + 'finda=city' + '&' + `city=${plz.value}`);
        console.log('response: ', response);
        let responseAsJson = await response.json();
        console.log('responseAsJson: ', responseAsJson);

        this.shadowRoot.querySelector('#search_city').value = responseAsJson.city;
    }

    async searchStreet() {
        let plz = this.shadowRoot.querySelector('#search_plz');
        let street = this.shadowRoot.querySelector('#search_street');
        let search = street.value.toLowerCase();

        let response = await fetch(CORS_URL + URL_Server + 'finda=streets' + '&' + `plz_plz=${plz.value}`);
        let responseAsJson = await response.json();
        let streets = responseAsJson['rows'];

        streets.forEach(s => {
            if (s['street'].toLowerCase().startsWith(search)) {
                this.shadowRoot.querySelector('#streets_preview').innerHTML += `<option value="${s['street']}">`;
            }
            console.log('s', s);
        });
        console.log('streets: ', streets);
    }

    connectedCallback() {
        this.shadowRoot.querySelector('#search_plz').addEventListener('keyup', () => this.searchPlz());
        this.shadowRoot.querySelector('#search_street').addEventListener('keyup', () => this.searchStreet());
    }
    disconnecteCallback() {
        this.shadowRoot.querySelector('#search_plz').removeEventListener('keyup', () => this.searchPlz());
        this.shadowRoot.querySelector('#search_street').removeEventListener('keyup', () => this.searchStreet());
    }

}

window.customElements.define("app-address-card", AddressCard);