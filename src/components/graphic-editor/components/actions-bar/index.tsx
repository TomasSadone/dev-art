import { useCanvasContext } from 'components/graphic-editor/canvas-context/useCanvasContext';
import { AppButton } from '../../../button';
import style from './style.module.sass';
import undoIcon from '../../../../assets/undo.svg';
import redoIcon from '../../../../assets/redo.svg';
import check from '../../../../assets/check.svg';

export type SaveObject = {
  version: string;
  objects: Object[];
  toDataURL: fabric.Canvas['toDataURL'];
  width: number;
  height: number;
  background: string;
};

type Props = {
  onSave: (template: SaveObject) => void;
  onExit: () => void;
};

export const ActionsBar = ({ onSave, onExit }: Props) => {
  const canvasInstanceRef = useCanvasContext();
  const undo = () => {
    if (!canvasInstanceRef.current) return;
    (canvasInstanceRef.current as { undo: () => void } & fabric.Canvas).undo();
  };
  const redo = () => {
    if (!canvasInstanceRef.current) return;
    (canvasInstanceRef.current as { redo: () => void } & fabric.Canvas).redo();
  };

  const handleSave = () => {
    if (!canvasInstanceRef.current) return;
    const { current: canvas } = canvasInstanceRef;
    //if you are going to edit the passed array, please remember to adjust the type SaveObject
    const jsonUntyped = canvas.toJSON([
      'width',
      'height',
      'toDataURL',
      'background',
    ]) as any;
    const json = jsonUntyped as SaveObject;
    json.toDataURL = json.toDataURL.bind(canvas);
    onSave(json);
  };

  return (
    <div className={style.actionsBar}>
      <span></span>
      <div className={style.subGroup}>
        <AppButton
          color='white'
          onClick={undo}
        >
          <img
            src={undoIcon}
            alt=''
          />
        </AppButton>
        <AppButton
          color='white'
          onClick={redo}
        >
          <img
            src={redoIcon}
            alt=''
          />
        </AppButton>

        <AppButton
          onClick={handleSave}
          icon={check}
          color='green'
          title='Save'
        />
      </div>
    </div>
  );
};
