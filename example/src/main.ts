import "./style.css";

import { render } from "../../src/render";
import { createState } from "../../src/state";
import { Counter } from "./counter";
import { Input } from "./input";

const app = document.getElementById("app")!;

export const appName = createState("My App");

render(
  {
    type: "div",
    attributes: {
      class: "grid",
    },
    children: [
      {
        type: "h1",
        content: () => appName.value,
      },
      Counter(),
      Input({ defaultValue: "Hello" }),
    ],
  },
  app
);
