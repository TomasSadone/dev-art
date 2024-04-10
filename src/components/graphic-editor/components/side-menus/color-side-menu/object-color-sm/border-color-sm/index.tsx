import { useCanvasContext } from 'components/graphic-editor/canvas-context/useCanvasContext';
import useCanvasAsState from 'components/graphic-editor/hooks/use-canvas-as-state';
import { ObjectColorSM } from '..';

export const BorderColorSM = () => {
  const canvasInstanceRef = useCanvasContext();
  const { _activeObject } = useCanvasAsState(
    canvasInstanceRef.current!,
    'after:render',
    ['_activeObject']
  );

  const valueToWatch = 'stroke';

  const onChange = (color: string) => {
    _activeObject.set(valueToWatch, color);
    _activeObject.fire('object:modified');
    canvasInstanceRef.current?.renderAll();
  };

  return (
    <ObjectColorSM
      title='Pick a color for the border'
      handleColorChange={onChange}
      valueToWatch={valueToWatch}
    />
  );
};
