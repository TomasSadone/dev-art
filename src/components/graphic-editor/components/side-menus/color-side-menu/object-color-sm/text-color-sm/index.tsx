import { useCanvasContext } from 'components/graphic-editor/canvas-context/useCanvasContext';
import { ColorSideMenu } from '../..';
import useCanvasAsState from 'components/graphic-editor/hooks/use-canvas-as-state';
import { ObjectColorSM } from '..';

export const TextColorSM = () => {
  const canvasInstanceRef = useCanvasContext();
  const { _activeObject } = useCanvasAsState(
    canvasInstanceRef.current!,
    'after:render',
    ['_activeObject']
  );

  const valueToWatch = 'fill';

  const onChange = (color: string) => {
    _activeObject.set(valueToWatch, color);
  };

  return (
    <ObjectColorSM
      title='Pick a color for the text'
      handleColorChange={onChange}
      valueToWatch={valueToWatch}
    />
  );
};
