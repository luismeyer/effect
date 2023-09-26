export type State<T> = {
  value: T;
  readonly type: "EffectState";
  readonly sub: (subscription: Subscribtion<T>) => void;
  readonly derive: <O>(transformer: (value: T) => O) => State<O>;
};

export type Effect = () => void;

type Subscribtion<T> = (newValue: T) => void;

export function createState<T>(initialValue: T): State<T> {
  let value = initialValue;

  const subscribers = new Set<Subscribtion<T>>();

  return {
    type: "EffectState",
    sub: (subscription: Subscribtion<T>) => {
      subscribers.add(subscription);
    },
    get value() {
      return value;
    },
    set value(newValue: T) {
      if (newValue === value) {
        return;
      }

      value = newValue;

      subscribers.forEach((subscription) => subscription(newValue));
    },
    derive(transformer) {
      const initial = transformer(value);
      const newState = createState(initial);

      subscribers.add((newValue) => {
        newState.value = transformer(newValue);
      });

      return newState;
    },
  };
}

export function createEffect<T>(effect: Effect, states: Array<State<T>>) {
  effect();

  states.forEach((state) => state.sub(() => effect()));
}
