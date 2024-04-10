import { EventName } from 'fabric/fabric-impl';
import { useCanvasContext } from '../../../../canvas-context/useCanvasContext';
import useCanvasAsState from '../../../../hooks/use-canvas-as-state';
import style from './style.module.sass';

type Props = {
  activeTextObject: fabric.IText;
};

const event: EventName = 'object:modified';

export const FontSizeHandler = ({ activeTextObject }: Props) => {
  const canvasInstanceRef = useCanvasContext();
  const { fontSize } = useCanvasAsState(activeTextObject, event, ['fontSize']);

  const handleSetFontSize = (fontSize: number) => {
    activeTextObject.set('fontSize', fontSize);
    activeTextObject.fire(event);
    if (canvasInstanceRef.current) {
      canvasInstanceRef.current.renderAll();
    }
  };
  return (
    <div className={style.handler}>
      <button
        onClick={() => {
          if (fontSize) {
            handleSetFontSize(fontSize - 1);
          }
        }}
      >
        -
      </button>
      <span className={style.fontSizeDisplay}>{fontSize}</span>
      <button
        onClick={() => {
          if (fontSize) {
            handleSetFontSize(fontSize + 1);
          }
        }}
      >
        +
      </button>
    </div>
  );
};
