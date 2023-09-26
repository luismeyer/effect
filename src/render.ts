import { Node } from "./node";
import { registerAttributes } from "./register-attributes";
import { registerEventlisteners } from "./register-event-listeners";
import { registerTextContent } from "./register-text-content";
import { renderChild } from "./render-child";

function renderChildren(node: Node, element: HTMLElement) {
  const { children } = node;

  if (!children) {
    return;
  }

  let childIndex = 0;

  children.forEach((child) => {
    if (child.type !== "EffectState") {
      renderChild(child, element, childIndex);
      return;
    }

    child.value.forEach((item) => {
      renderChild(item, element, childIndex);

      childIndex + 1;
    });

    child.sub((newValue) => {
      newValue.forEach((item) => {
        renderChild(item, element, childIndex);

        childIndex + 1;
      });
    });

    childIndex + 1;
  });
}

export function recursiveRender(node: Node) {
  const element = document.createElement(node.type);

  registerAttributes(node, element);

  registerEventlisteners(node, element);

  registerTextContent(node, element);

  renderChildren(node, element);

  return element;
}

export function render(node: Node, mount: HTMLElement) {
  const element = recursiveRender(node);

  mount.appendChild(element);
}
