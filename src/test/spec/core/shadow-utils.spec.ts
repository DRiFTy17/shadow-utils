import { deepQuerySelectorAll, getActiveElement } from 'shadow-utils';

describe('shadow-utils', () => {
  describe('deepQuerySelectorAll', () => {
    beforeAll(() => {
      fixture.load('shadow-utils/deepQuerySelectorAll.fixture.html');
    });
  
    afterAll(() => {
      fixture.cleanup();
    });

    it('should find all light, slotted, and shadow dom elements in proper order', () => {
      const selectors = ['input', 'textarea', 'button', 'p'];
      const actual = deepQuerySelectorAll(document.body, selectors).map(el => el.id);
      const expected = [
        'light-input',
        'light-textarea',
        'light-button',
        'light-p',
        'shadow-input',
        'shadow-textarea',
        'shadow-button',
        'shadow-p',
        'slot-input',
        'slot-textarea',
        'slot-button',
        'slot-p',
        'shadow-input',
        'shadow-textarea',
        'shadow-button',
        'shadow-p',
        'shadow-sub-button',
        'shadow-sub-button'
      ];

      expect(actual).toEqual(expected);
    });

    it('should return empty array if no root element provided', () => {
      const actual = deepQuerySelectorAll(undefined as any, []);
      expect(actual).toBeDefined();
      expect(actual instanceof Array).toBe(true);
      expect(actual.length).toBe(0);
    });

    it('should not check original root element by default', () => {
      const rootElement = document.body.querySelector('div[id=light-div]') as HTMLElement;
      const selectors = ['div'];
      const actual = deepQuerySelectorAll(rootElement, selectors).map(el => el.id);
      const expected = [
        'light-sub-div'
      ];

      expect(actual).toEqual(expected);
    });

    it('should check original root element', () => {
      const rootElement = document.body.querySelector('div[id=light-div]') as HTMLElement;
      const selectors = ['div'];
      const actual = deepQuerySelectorAll(rootElement, selectors, true).map(el => el.id);
      const expected = [
        'light-div',
        'light-sub-div'
      ];

      expect(actual).toEqual(expected);
    });

    it('should allow for both string and string array as selectors', () => {
      const actual = deepQuerySelectorAll(document.body, 'input, p, div');
      const expected = deepQuerySelectorAll(document.body, ['input', 'p', 'div']);

      expect(actual.length).toBeGreaterThan(0);
      expect(expected.length).toBeGreaterThan(0);
      expect(actual.length).toBe(expected.length);
      expect(actual).toEqual(expected);
    });

    it('should produce same result as native querySelectorAll for light DOM nodes only', () => {
      const rootElement = document.body.querySelector('div[id=light-container]') as HTMLElement;
      const actual = Array.from(rootElement.querySelectorAll('*'));
      const expected = deepQuerySelectorAll(rootElement, '*');

      expect(actual).toEqual(expected);
    });

    it('should produce same result as native querySelectorAll for specific light DOM node selectors only', () => {
      const rootElement = document.body.querySelector('div[id=light-container]') as HTMLElement;
      const selectors = ['input', 'button[id=light-button]', 'div'];

      const actual = Array.from(rootElement.querySelectorAll(selectors.join(',')));
      const expected = deepQuerySelectorAll(rootElement, selectors);

      expect(actual).toEqual(expected);
    });
  });

  describe('getActiveElement', () => {
    beforeEach(() => {
      fixture.load('shadow-utils/getActiveElement.fixture.html');
    });
  
    afterEach(() => {
      fixture.cleanup();
    });

    it('should return body when no element is focused', () => {
      expect(getActiveElement()).toBe(document.body);
    });

    it('should produce same results as document.activeElement if nothing has focus', () => {
      expect(getActiveElement()).toBe(document.body);
      expect(document.activeElement).toBe(document.body);
    });

    it('should detect element in light dom with focus', () => {
      const input = document.body.querySelector('input[id=light-input]') as HTMLInputElement;
      input.focus();
      
      expect(getActiveElement()).toBe(input);
    });

    it('should produce same result as document.activeElement', () => {
      const input = document.body.querySelector('input[id=light-input]') as HTMLInputElement;
      input.focus();
      
      const actual = input;
      const expected = getActiveElement() as HTMLInputElement;

      expect(actual).toBe(expected);
      expect(document.activeElement as HTMLElement).toBe(input);
    });

    it('should detect focus on slotted element', (done: DoneFn) => {      
      requestAnimationFrame(() => {
        const input = document.body.querySelector('input[id=slot-input]') as HTMLInputElement;
        input.focus();

        const expected = input;
        const actual = getActiveElement() as HTMLInputElement;

        expect(expected).toBe(actual);
        done();
      });
    });
    
    it('should detect focus on shadow element', () => {
      const webComponent = document.body.querySelector('test-web-component-input') as TestWebComponentInput;
      const input = (<ShadowRoot>webComponent.shadowRoot).querySelector('input[id=shadow-input]') as HTMLInputElement;
      input.focus();

      expect(getActiveElement()).toBe(input);
    });
  });
});
