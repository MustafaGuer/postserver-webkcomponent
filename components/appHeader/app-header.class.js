const headerTemplate = document.createElement("template");
headerTemplate.innerHTML = `
    <style>
        @import url('http://${location.host}/components/appHeader/app-header.css');
    </style>

    <header>Adress Suche nach PLZ und Stadt</header>
`;

class AppHeader extends HTMLElement {
    
    
    constructor() {
        super();

        this.attachShadow({ mode : 'open' });
        this.shadowRoot.appendChild(headerTemplate.content.cloneNode(true));    
    }
}

window.customElements.define("app-header", AppHeader);