import { State } from "./state";

export type Node = {
  readonly type: keyof HTMLElementTagNameMap;
  readonly eventListeners?: Partial<
    Record<keyof GlobalEventHandlersEventMap, EventListener>
  >;

  readonly children?: (Node | State<Node[]>)[];
  readonly textContent?: State<unknown> | string;
  readonly attributes?: Record<string, State<unknown> | string>;
  readonly visible?: State<unknown>;
};

export type InternalNode = Node & {
  readonly _key: string;
};
