import { forwardRef, useRef } from 'react';
import { fabric } from 'fabric';
import { GraphicEditor, Props } from '..';
import { CanvasContext } from './useCanvasContext';

export const GraphicEditorWithContext = forwardRef((props: Props, ref) => {
  const canvasInstanceRef = useRef<fabric.Canvas | null>(null);
  return (
    <CanvasContext.Provider value={canvasInstanceRef}>
      <GraphicEditor ref={ref} {...props} />
    </CanvasContext.Provider>
  );
});
