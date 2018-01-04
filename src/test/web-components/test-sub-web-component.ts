class TestSubWebComponent extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: 'open' });

    const button = document.createElement('button');
    button.id = 'shadow-sub-button';
    shadowRoot.appendChild(button);
  }
}

window.customElements.define('test-sub-web-component', TestSubWebComponent);
