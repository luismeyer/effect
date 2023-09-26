import "./style.css";

import { render } from "../../src/render";
import { createState } from "../../src/state";
import { Counter } from "./counter";
import { Input } from "./input";
import { List } from "./list";

const app = document.getElementById("app")!;

export const appNameState = createState("Test App");

render(
  {
    type: "div",
    attributes: { class: "grid" },
    children: [
      {
        type: "h1",
        textContent: appNameState,
      },
      Counter(),
      Input({ defaultValue: "Hello" }),
      List(),
    ],
  },
  app
);
