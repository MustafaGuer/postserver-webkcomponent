const addressTemplate = document.createElement("template");
addressTemplate.innerHTML = `
    <style>
        @import url('http://${location.host}/components/addressCard/address-card.css');
    </style>

    <div class="container">
        <form onsubmit="return false;" method="POST">
            <input id="search_plz" min="0" placeholder="PLZ" type="number" >
            <input id="search_city" placeholder="Stadt" type="text" >
            <input id="search_street" placeholder="Straße" type="search" autocomplete="off">
            
            <input id="search_nr" min="1" placeholder="Hausnummer" type="text" >
            <input value="DE - Deutschland" disabled >
        </form>
    </div>
`;

const CORS_URL = "https://cors-anywhere.herokuapp.com/";
const URL_Server = "https://www.postdirekt.de/plzserver/PlzAjaxServlet?";

class AddressCard extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(addressTemplate.content.cloneNode(true));

    }

    async searchPlz() {

        let response = await fetch(CORS_URL + URL_Server + "finda=city" + "&" + `city=${this.shadowRoot.querySelector('#search_plz').value}`);
        console.log('response: ', response);
        let responseAsJson = await response.json();
        console.log('responseAsJson: ', responseAsJson);

        console.log('input value: ', this.shadowRoot.querySelector('#search_plz').value);
    }

    connectedCallback() {
        this.shadowRoot.querySelector('#search_plz').addEventListener('keyup', () => this.searchPlz());
    }
    disconnecteCallback() {
        this.shadowRoot.querySelector('#search_plz').removeEventListener('keyup', () => this.searchPlz());
    }

}

window.customElements.define("app-address-card", AddressCard);