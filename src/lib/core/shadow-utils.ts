import { DOMHelper } from './dom-helper';

/**
 * Provies facilities for working with shadow DOM.
 */
export class ShadowUtils {
  /**
   * Walks the DOM tree starting at a root element and checks if any of its children 
   * match the provided selectors. Similar to the native `querySelectorAll` except
   * that it will traverse the shadow DOM as well as slotted nodes.
   * @param {Element} rootElement The element to start querying from.
   * @param {string[]} selectors An array of CSS selectors.
   * @param {boolean} [checkRootElement] True if the provided root element is to be matched against the selectors.
   */
  public static deepQuerySelectorAll(rootElement: Element, selectors: string | string[], checkRootElement: boolean = false) {
    let nodes: Element[] = [];

    if (!rootElement) {
      return nodes;
    }

    if (typeof selectors === 'string') {
      selectors = selectors.replace(/\s+/, '').split(',');
    }

    if (checkRootElement && DOMHelper.matchesSelectors(rootElement, selectors) && nodes.indexOf(rootElement) === -1) {
      nodes.push(rootElement);
    }

    if (rootElement.tagName === 'SLOT') {
      const slotNodes = (<HTMLSlotElement>rootElement).assignedNodes() as Element[];
      slotNodes.forEach(slottedNode => nodes = nodes.concat(ShadowUtils.deepQuerySelectorAll(slottedNode, selectors, true)));
    } else {
      var node = rootElement.shadowRoot ? rootElement.shadowRoot.firstElementChild : rootElement.firstElementChild;
      while (node) {
        nodes = nodes.concat(ShadowUtils.deepQuerySelectorAll(node, selectors, true));
        node = node.nextElementSibling;
      }
    }

    return nodes;
  }

  /** 
   * Gets the currently focused element within the document by also traversing shadow roots.
   * @returns {Element}
   */
  public static getActiveElement(): Element {
    const activeElement = document.activeElement;

    if (!activeElement || activeElement === document.body) {
      return activeElement;
    }

    return ShadowUtils._getActiveShadowElement(activeElement) as Element;
  }

  /**
   * Gets the active element within the provided elements shadow root. If the element
   * does not have a shadow root, the provided element is returned.
   * @param {Element} element The active element.
   */
  private static _getActiveShadowElement(element: Element): Element {
    if (element.shadowRoot && element.shadowRoot.activeElement) {
      element = ShadowUtils._getActiveShadowElement(element.shadowRoot.activeElement);
    }
    return element;
  }
}
