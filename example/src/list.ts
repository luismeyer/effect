import { Node } from "../../src/node";
import { createState } from "../../src/state";

export function List(): Node {
  const items = createState<number[]>(
    Array.from({ length: 5 }).map((_, i) => i)
  );

  return {
    type: "div",
    attributes: {
      class: "flex flex-col",
    },
    children: [
      {
        type: "button",
        textContent: "Add",
        eventListeners: {
          click: () => {
            items.value = [...items.value, items.value.length];
          },
        },
      },

      items.derive((value) =>
        value.map((item): Node => ({ type: "span", textContent: String(item) }))
      ),

      {
        type: "button",
        textContent: "Remove",
        eventListeners: {
          click: () => {
            items.value = items.value.slice(0, -1);
          },
        },
      },
    ],
  };
}
