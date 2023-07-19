export type State<T> = { value: T };

export type Effect = () => void;

let trackingEffect: Effect | undefined;

export function trackEffect(fc: Effect) {
  trackingEffect = fc;
  fc();
  trackingEffect = undefined;
}

export function createState<T>(initialValue: T) {
  let variable = initialValue;

  const dependencies = new Set<() => void>();

  const state = {
    get value() {
      if (trackingEffect) {
        dependencies.add(trackingEffect);
      }

      return variable;
    },
    set value(newValue: T) {
      variable = newValue;

      dependencies.forEach((effect) => effect());
    },
  };

  return state;
}

export function createEffect(effect: Effect) {
  trackEffect(effect);
}
