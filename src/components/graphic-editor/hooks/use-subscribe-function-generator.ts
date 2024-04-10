import { Canvas, EventName, Object } from 'fabric/fabric-impl';
import { useMemo } from 'react';

export type SubscribableStore = Object | Canvas;

export const useSubscribeFunctionGenerator = (object: SubscribableStore, event: EventName) => {
  const subscribe = (callback: any) => {
    object.on(event, callback);
    return () => {
      object.off(event, callback);
    };
  };
  return useMemo(() => subscribe, [object, event]);
};
