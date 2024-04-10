import { useCanvasContext } from '../../../canvas-context/useCanvasContext';
import { ColorSelector } from '../../color-selector';

export const CanvasToolbar = () => {
  const canvasInstanceRef = useCanvasContext();
  if (!canvasInstanceRef.current) return <></>;

  return (
    <div>
      <ColorSelector
        border
        valueToWatch="backgroundColor"
        section="canvas-color"
        object={canvasInstanceRef.current}
      />
    </div>
  );
};
