import { trackEffect } from "./state";

type ReactiveString = () => string;

export type Element = {
  type: keyof HTMLElementTagNameMap;
  content?: ReactiveString | string;
  children?: Element[];
  attributes?: Record<string, ReactiveString | string>;
  eventListeners?: Partial<
    Record<keyof GlobalEventHandlersEventMap, EventListener>
  >;
};

function renderElement(node: Element, parent: HTMLElement) {
  const element = document.createElement(node.type);

  if (node.attributes) {
    Object.entries(node.attributes).forEach(([key, value]) => {
      if (typeof value === "string") {
        element.setAttribute(key, value);
      }

      if (typeof value === "function") {
        trackEffect(() => {
          const newValue = value();

          if (!newValue) {
            element.removeAttribute(key);
            return;
          }

          element.setAttribute(key, newValue);
        });
      }
    });
  }

  if (node.eventListeners) {
    Object.entries(node.eventListeners).forEach(([key, value]) => {
      element.addEventListener(key, value);
    });
  }

  if (node.content && typeof node.content === "string") {
    element.textContent = node.content;
  }

  if (node.content && typeof node.content === "function") {
    element.textContent = node.content();

    trackEffect(() => {
      if (typeof node.content !== "function") {
        return;
      }

      element.textContent = node.content();
    });
  }

  parent.appendChild(element);

  node.children?.forEach((child) => {
    render(child, element);
  });
}

export function render(node: Element, parent: HTMLElement) {
  renderElement(node, parent);
}
