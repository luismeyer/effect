import { Node } from "./node";

export function registerEventlisteners(
  { eventListeners }: Node,
  element: HTMLElement
) {
  if (!eventListeners) {
    return;
  }

  Object.entries(eventListeners).forEach(([key, value]) => {
    element.addEventListener(key, value);
  });
}
