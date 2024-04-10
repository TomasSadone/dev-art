import { useSyncExternalStore } from 'react';

type StoreValues<Obj, Arr extends Array<keyof Obj>> = {
  [Str in Arr[number]]: Obj[Str];
};

const useSyncMultipleValues = <
  Store extends { [key: string]: any },
  Values extends Array<keyof Store>,
>(
  subscribe: (onStoreChange: () => void) => () => void,
  values: Values,
  store: Store,
): StoreValues<Store, Values> => {
  const getSnapshots = values.map((value) => () => store[value]);
  const statefulValues = getSnapshots.reduce((obj, getSnapshot, i) => {
    // eslint-disable-next-line
    obj[values[i]] = useSyncExternalStore(subscribe, getSnapshot);
    return obj;
  }, {} as StoreValues<Store, Values>);
  return statefulValues;
};

export default useSyncMultipleValues;
