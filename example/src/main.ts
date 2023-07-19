import { render } from "../../src/render";
import { Counter } from "./counter";
import { Input } from "./input";

const app = document.getElementById("app")!;

render(
  {
    type: "div",
    children: [
      {
        type: "h1",
        content: "My App",
      },
      Counter(),
      Input({ defaultValue: "Hello" }),
    ],
  },
  app
);
