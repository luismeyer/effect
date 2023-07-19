import { Element } from "../../src/render";
import { createState } from "../../src/state";
import { appName } from "./main";

type InputProps = {
  defaultValue: string;
};

export function Input({ defaultValue }: InputProps): Element {
  const inputValue = createState(defaultValue);

  return {
    type: "div",
    attributes: {
      class: "flex",
    },
    children: [
      {
        type: "span",
        content: "Input:",
      },

      {
        type: "input",
        attributes: {
          type: "text",
          value: () => inputValue.value,
        },
        eventListeners: {
          input: (event) => {
            const { value } = event.target as HTMLInputElement;

            inputValue.value = value;
          },
        },
      },

      {
        type: "button",
        content: "Set App Name",
        eventListeners: {
          click: () => {
            appName.value = inputValue.value;
          },
        },
      },
    ],
  };
}
