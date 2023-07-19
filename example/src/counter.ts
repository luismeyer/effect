import { Node } from "../../src/render";
import { createState } from "../../src/state";

export function Counter(): Node {
  const count = createState(0);

  return {
    type: "div",
    children: [
      {
        type: "button",
        content: "-",
        eventListeners: {
          click: () => {
            count.value = count.value - 1;
          },
        },
      },
      {
        type: "span",
        content: () => ` ${count.value} `,
      },
      {
        type: "button",
        content: "+",
        eventListeners: {
          click: () => {
            count.value = count.value + 1;
          },
        },
      },
    ],
  };
}
