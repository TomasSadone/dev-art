import { EventName } from 'fabric/fabric-impl';
import {
  SubscribableStore,
  useSubscribeFunctionGenerator,
} from './use-subscribe-function-generator';
import useSyncMultipleValues from './use-sync-multiple-values';

const useCanvasAsState = <Store extends SubscribableStore, Values extends (keyof Store)[]>(
  object: Store,
  event: EventName,
  values: Values,
) => {
  const subscribe = useSubscribeFunctionGenerator(object, event);
  const statefulValues = useSyncMultipleValues(subscribe, values, object);
  return statefulValues;
};

export default useCanvasAsState;
