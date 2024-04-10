import { Color } from '../../../color';
import useCanvasAsState from '../../hooks/use-canvas-as-state';
import { EventName } from 'fabric/fabric-impl';
import style from './style.module.sass';
import { useAtom } from 'jotai';
import { handleSetSelectedSectionAtom } from '../../canvas-context/atoms/atoms';

type BaseProps = {
  section: 'text-color' | 'element-color' | 'border-color' | 'canvas-color';
  border?: boolean;
};

type CanvasProps = {
  object: fabric.Canvas;
  valueToWatch: 'backgroundColor';
} & BaseProps;

type ObjectProps = {
  object: fabric.Object;
  valueToWatch: 'fill' | 'stroke';
} & BaseProps;

type Props = CanvasProps | ObjectProps;

export const ColorSelector = ({ object, valueToWatch, section, border }: Props) => {
  const event: EventName = 'object:modified';
  const [, setSelectedSectionAtom] = useAtom(handleSetSelectedSectionAtom);
  const handleClick = () => {
    setSelectedSectionAtom(section);
  };
  // @ts-expect-error
  // expect error because 'stroke' does not exist in type 'Canvas'. but we are type gaurding that "object: canvas" and "valueToWatch: stroke"
  // don't get passed at the same time
  const value = useCanvasAsState(object, event, [valueToWatch]) as Record<string, any>;

  const hexCode = value[valueToWatch] || '#fff';
  return (
    <button className={`${style.color} ${border && style.border}`} onClick={handleClick}>
      <Color className={style.color} hexCode={hexCode} />
    </button>
  );
};
