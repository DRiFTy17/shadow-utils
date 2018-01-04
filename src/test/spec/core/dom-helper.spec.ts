import { DOMHelper } from 'shadow-utils';

describe('DOMHelper', () => {
  describe('matchesSelectors', () => {
    it('should return true if element matches a selector', () => {
      const el = document.createElement('div');
      el.classList.add('some-class');

      const actual = DOMHelper.matchesSelectors(el, 'div.some-class');

      expect(actual).toBe(true);
    });

    it('should return false if element doesn\'t match a selector', () => {
      const el = document.createElement('div');
      el.classList.add('some-class');

      const actual = DOMHelper.matchesSelectors(el, 'p.some-class');

      expect(actual).toBe(false);
    });

    it('should return false if not element node', () => {
      const commentNode = document.createComment('some test comment');
      const actual = DOMHelper.matchesSelectors(commentNode, ['div', 'p']);

      expect(actual).toBe(false);
    });

    it('should allow for both string and string array as selectors', () => {
      const matches1 = DOMHelper.matchesSelectors(document.body, 'body,div,p');
      const matches2 = DOMHelper.matchesSelectors(document.body, 'body, div, p');
      const matches3 = DOMHelper.matchesSelectors(document.body, ['body', 'div', 'p']);

      expect(matches1).toBe(true);
      expect(matches2).toBe(true);
      expect(matches3).toBe(true);
    });
  });
});
