import { Node } from "../../src/node";
import { createState } from "../../src/state";
import { appNameState } from "./main";

type InputProps = {
  defaultValue: string;
};

export function Input({ defaultValue }: InputProps): Node {
  const inputState = createState(defaultValue);

  return {
    type: "div",
    attributes: {
      class: "flex",
    },
    children: [
      {
        type: "span",
        textContent: "Input:",
      },

      {
        type: "input",
        attributes: {
          type: "text",
          value: inputState,
        },
        eventListeners: {
          input: (event) => {
            const { value } = event.target as HTMLInputElement;

            inputState.value = value;
          },
        },
      },

      {
        type: "button",
        textContent: "Set App Name",
        eventListeners: {
          click: () => {
            appNameState.value = inputState.value;
          },
        },
      },
    ],
  };
}
