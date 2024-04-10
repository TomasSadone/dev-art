import { useCanvasContext } from 'components/graphic-editor/canvas-context/useCanvasContext';
import { ColorSideMenu } from '..';
import useCanvasAsState from 'components/graphic-editor/hooks/use-canvas-as-state';

export const CanvasColorSM = () => {
  const canvasInstanceRef = useCanvasContext();
  if (!canvasInstanceRef.current) return <></>;

  const { backgroundColor } = useCanvasAsState(
    canvasInstanceRef.current,
    'after:render',
    ['backgroundColor']
  );

  const onChange = (color: string) => {
    canvasInstanceRef.current?.setBackgroundColor(color, () =>
      canvasInstanceRef.current?.requestRenderAll()
    );
  };

  const color = backgroundColor || '#fff';

  return (
    <ColorSideMenu
      title='Pick a color for the background'
      color={color as string}
      handleColorChange={onChange}
    />
  );
};
