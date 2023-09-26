import { Node } from "./node";

export function registerAttributes({ attributes }: Node, element: HTMLElement) {
  if (!attributes) {
    return;
  }

  Object.entries(attributes).forEach(([key, value]) => {
    if (typeof value === "string") {
      element.setAttribute(key, value);
      return;
    }

    if (value.type === "EffectState") {
      element.setAttribute(key, String(value.value));

      value.sub((newValue) => {
        if (!newValue) {
          element.removeAttribute(key);
          return;
        }

        element.setAttribute(key, String(newValue));
      });
    }
  });
}
