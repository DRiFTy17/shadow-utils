class TestWebComponentInput extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: 'open' });

    const input = document.createElement('input');
    input.type = 'text';
    input.id = 'shadow-input';
    shadowRoot.appendChild(input);

    const slot = document.createElement('slot') as HTMLSlotElement;
    shadowRoot.appendChild(slot);
  }
}

window.customElements.define('test-web-component-input', TestWebComponentInput);
