import { Node } from "./node";
import { recursiveRender } from "./render";

function insertOrAppendChild(
  parent: HTMLElement,
  newparent: HTMLElement,
  index: number
) {
  const oldNode = parent.children[index];

  if (!oldNode) {
    parent.appendChild(newparent);
    return;
  }

  parent.insertBefore(newparent, oldNode);
}

export function renderChild(node: Node, parent: HTMLElement, index: number) {
  const childResult = recursiveRender(node);

  // static component that is always visible
  if (!node.visible) {
    parent.appendChild(childResult);
    return;
  }

  // initial render
  if (node.visible.value) {
    parent.appendChild(childResult);
  }

  node.visible.sub((newVisible) => {
    if (newVisible) {
      insertOrAppendChild(parent, childResult, index);
    } else {
      parent.removeChild(childResult);
    }
  });
}
