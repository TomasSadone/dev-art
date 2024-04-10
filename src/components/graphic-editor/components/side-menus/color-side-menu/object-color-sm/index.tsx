import {
  handleSetSelectedSectionAtom,
  selectedItemTypeAtom,
} from 'components/graphic-editor/canvas-context/atoms/atoms';
import { useCanvasContext } from 'components/graphic-editor/canvas-context/useCanvasContext';
import useCanvasAsState from 'components/graphic-editor/hooks/use-canvas-as-state';
import { useAtom } from 'jotai';
import { ColorSideMenu } from '..';
import { EventName } from 'fabric/fabric-impl';

type Props = {
  title: string;
  handleColorChange: (color: string) => void;
  valueToWatch: 'backgroundColor' | 'fill' | 'stroke';
};

export const ObjectColorSM = ({ handleColorChange, valueToWatch, title }: Props) => {
  const canvasInstanceRef = useCanvasContext();
  const [, setSelectedSection] = useAtom(handleSetSelectedSectionAtom);
  const [itemType] = useAtom(selectedItemTypeAtom);
  if (itemType === '')
    if (!canvasInstanceRef.current) {
      return <></>;
    }

  const { _activeObject } = useCanvasAsState(canvasInstanceRef.current!, 'after:render', [
    '_activeObject',
  ]);

  // prevent error on section change
  if (!_activeObject) setSelectedSection('');

  const event: EventName = 'object:modified';
  const value = useCanvasAsState(_activeObject, event, [valueToWatch]);

  const handleClick = (color: string) => {
    handleColorChange(color);
    _activeObject.fire(event);
    canvasInstanceRef.current?.requestRenderAll();
  };

  const color = value[valueToWatch] || '#000';

  return (
    <ColorSideMenu color={color as string} handleColorChange={handleClick} title={title} />
  );
};
