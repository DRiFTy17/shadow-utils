/**
 * Checks if an element matches any of the provided selectors.
 * @param {Element} el The element to match.
 * @param {string[]} selectors The selectors to check the element against.
 */
export function matchesSelectors(el: Element | Node, selectors: string | string[]): boolean {
  if (el.nodeType !== Node.ELEMENT_NODE) {
    return false;
  }

  if (typeof selectors === 'string') {
    selectors = selectors.replace(/\s+/, '').split(',');
  }

  const matchesFn = Element.prototype.matches || (<any>Element.prototype).msMatchesSelector || Element.prototype.webkitMatchesSelector;
  return selectors.some(selector => matchesFn.call(el, selector));
}
