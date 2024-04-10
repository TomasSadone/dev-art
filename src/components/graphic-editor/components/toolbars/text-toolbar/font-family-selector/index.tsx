import style from './style.module.sass';
import { EventName } from 'fabric/fabric-impl';
import { useCanvasContext } from '../../../../canvas-context/useCanvasContext';
import useCanvasAsState from '../../../../hooks/use-canvas-as-state';
import { fonts } from '../../../../constants/fonts';

type Props = {
  activeTextObject: fabric.IText;
};

const event: EventName = 'object:modified';

export const FontFamilySelector = ({ activeTextObject }: Props) => {
  const canvasInstanceRef = useCanvasContext();
  const { fontFamily } = useCanvasAsState(activeTextObject, event, ['fontFamily']);
  const handleChange = (font: (typeof fonts)[number]) => {
    if (!canvasInstanceRef.current) return;
    activeTextObject.set('fontFamily', font);
    activeTextObject.fire(event);
    canvasInstanceRef.current.renderAll();
  };
  return (
    <select
      className={style.select}
      onChange={(e) => handleChange(e.target.value as (typeof fonts)[number])}
      value={fontFamily}
    >
      {fonts.map((font) => (
        <option key={font} value={font}>
          {font}
        </option>
      ))}
    </select>
  );
};
