class TestWebComponent extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: 'open' });

    const input = document.createElement('input');
    input.id = 'shadow-input';
    input.type = 'text';
    shadowRoot.appendChild(input);

    shadowRoot.appendChild(document.createTextNode('Test comment node - shadow'));

    const textarea = document.createElement('textarea');
    textarea.id = 'shadow-textarea';
    shadowRoot.appendChild(textarea);

    const button = document.createElement('button');
    button.id = 'shadow-button';
    shadowRoot.appendChild(button);

    const p = document.createElement('p');
    p.id = 'shadow-p';
    shadowRoot.appendChild(p);

    const slot = document.createElement('slot') as HTMLSlotElement;
    slot.name = 'slot-1';
    shadowRoot.appendChild(slot);

    const subWebComponent = document.createElement('test-sub-web-component') as TestSubWebComponent;
    shadowRoot.appendChild(subWebComponent);
  }
}

window.customElements.define('test-web-component', TestWebComponent);
