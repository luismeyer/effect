import { Node } from "./node";

export function registerTextContent(
  { textContent: content }: Node,
  element: HTMLElement
) {
  if (!content) {
    return;
  }

  if (typeof content === "string") {
    element.textContent = content;
    return;
  }

  if (content.type === "EffectState") {
    element.textContent = String(content.value);

    content.sub((newValue) => {
      element.textContent = String(newValue);
    });
  }
}
