import { Element } from "../../src/render";
import { createEffect, createState } from "../../src/state";

type InputProps = {
  defaultValue: string;
};

export function Input({ defaultValue }: InputProps): Element {
  const inputValue = createState(defaultValue);

  createEffect(() => {
    console.log(inputValue.value);
  });

  return {
    type: "div",
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
            console.log("change ", event.target);

            inputValue.value = (event.target as HTMLInputElement).value;
          },
          focus: () => {
            console.log("focus input");
          },
        },
      },
    ],
  };
}
