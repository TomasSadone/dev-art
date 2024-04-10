import { createContext, useContext } from 'react';
import { fabric } from 'fabric';

export const CanvasContext =
  createContext<React.MutableRefObject<fabric.Canvas | null> | null>(null);

export const useCanvasContext = () => {
  const canvasContext = useContext(CanvasContext);
  if (!canvasContext) {
    throw new Error('useCanvasContext has to be used within <CanvasContextProvider/>');
  }
  return canvasContext;
};
