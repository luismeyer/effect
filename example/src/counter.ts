import { Node } from "../../src/node";
import { createEffect, createState } from "../../src/state";
import { appNameState } from "./main";

export function Counter(): Node {
  const count = createState(0);

  createEffect(() => {
    if (count.value === 5) {
      appNameState.value = "You clicked 5 times";
    }
  }, [count]);

  return {
    type: "div",
    attributes: {
      class: "flex flex-row gap-2",
    },
    children: [
      {
        type: "button",
        textContent: "-",
        visible: count.derive((value) => value > 0),
        eventListeners: {
          click: () => {
            count.value = count.value - 1;
          },
        },
      },
      {
        type: "span",
        textContent: count,
      },
      {
        type: "button",
        textContent: "+",
        visible: count.derive((value) => value < 10),
        eventListeners: {
          click: () => {
            count.value = count.value + 1;
          },
        },
      },
    ],
  };
}
