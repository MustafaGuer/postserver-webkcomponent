const addressTemplate = document.createElement("template");
addressTemplate.innerHTML = `
    <style>
        @import url('http://${location.host}/components/addressCard/address-card.css');
    </style>

    <div class="container">
        <form>
            <input placeholder="PLZ" type="number" >
            <input placeholder="Stadt" type="string" >
            <input placeholder="Straße" type="string" >
            <input placeholder="Hausnummer" type="number" >
            <input value="DE - Deutschland" disabled >
        </form>
    </div>
`;

class AddressCard extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode : 'open' });
        this.shadowRoot.appendChild(addressTemplate.content.cloneNode(true));


    }
}

window.customElements.define("app-address-card", AddressCard);