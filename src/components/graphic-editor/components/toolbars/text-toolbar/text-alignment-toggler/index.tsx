import style from './style.module.sass';
import { EventName } from 'fabric/fabric-impl';
import useCanvasAsState from '../../../../hooks/use-canvas-as-state';
import { useCanvasContext } from '../../../../canvas-context/useCanvasContext';
import alignLeft from '../../../../../../assets/align-left.svg';
import alignCenter from '../../../../../../assets/align-center.svg';
import alignRight from '../../../../../../assets/align-right.svg';
const icons = {
  left: alignLeft,
  center: alignCenter,
  right: alignRight,
};

type Position = 'left' | 'center' | 'right';

type Props = {
  activeTextObject: fabric.IText;
  title: string;
};

const event: EventName = 'object:modified';

export const TextAlignmentToggler = ({ activeTextObject, title }: Props) => {
  const canvasInstanceRef = useCanvasContext();
  const { textAlign } = useCanvasAsState(activeTextObject, event, [
    'textAlign',
  ]) as {
    textAlign: Position;
  };
  const changeAlignment = (newPosition: Position) => {
    if (!canvasInstanceRef.current) return;
    activeTextObject.set('textAlign', newPosition);
    activeTextObject.fire(event);
    canvasInstanceRef.current.renderAll();
  };
  const handleAlignmentStrategy = (position: Position) => {
    if (position === 'left') {
      changeAlignment('center');
    } else if (position === 'center') {
      changeAlignment('right');
    } else if (position === 'right') {
      changeAlignment('left');
    }
  };
  return (
    <button
      className={style.toggler}
      title={title}
      onClick={() => handleAlignmentStrategy(textAlign)}
    >
      <img
        src={icons[textAlign]}
        alt=''
      />
    </button>
  );
};
