import { Element } from "../../src/render";
import { createEffect, createState } from "../../src/state";
import { appName } from "./main";

export function Counter(): Element {
  const count = createState(0);

  createEffect(() => {
    if (count.value < 5) {
      return;
    }

    appName.value = "Nice clicking";
  });

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
