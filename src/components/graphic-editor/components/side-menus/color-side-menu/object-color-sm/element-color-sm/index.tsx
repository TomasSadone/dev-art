import { useCanvasContext } from 'components/graphic-editor/canvas-context/useCanvasContext';
import { ColorSideMenu } from '../..';
import useCanvasAsState from 'components/graphic-editor/hooks/use-canvas-as-state';
import { fabric } from 'fabric';
import { ObjectColorSM } from '..';

export const ElementColorSM = () => {
  const canvasInstanceRef = useCanvasContext();
  const { _activeObject } = useCanvasAsState(
    canvasInstanceRef.current!,
    'after:render',
    ['_activeObject']
  );

  const valueToWatch = 'fill';

  const recursiveFillSetter = (object: fabric.Object, color: string) => {
    if (object[valueToWatch]) {
      object.set(valueToWatch, color);
    }

    if (object instanceof fabric.Group) {
      object._objects.forEach((child) => recursiveFillSetter(child, color));
    }
  };

  const onChange = (color: string) => {
    recursiveFillSetter(_activeObject, color);
  };

  return (
    <ObjectColorSM
      title='Pick a color for the element'
      handleColorChange={onChange}
      valueToWatch={valueToWatch}
    />
  );
};
