import { EventName, Object } from 'fabric/fabric-impl';
import useCanvasAsState from '../../hooks/use-canvas-as-state';
import { SubscribableStore } from '../../hooks/use-subscribe-function-generator';
import { useCanvasContext } from '../../canvas-context/useCanvasContext';

type Props = {
  object: Object;
  section: 'text-color' | 'element-color';
};

export const BorderEditor = ({ object, section }: Props) => {
  const event: EventName = 'object:modified';
  const canvasInstanceRef = useCanvasContext();
  const { strokeWidth } = useCanvasAsState(object, event, ['strokeWidth']);

  const handle = () => {
    // object.set('strokeWidth', object?.strokeWidth + 1);
    object.fire(event);
    canvasInstanceRef.current?.renderAll();
  };
  console.log(strokeWidth);

  return <div onClick={handle}>index</div>;
};
