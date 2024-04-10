import style from './style.module.sass';
import useCanvasAsState from '../../../../hooks/use-canvas-as-state';
import { useState } from 'react';

export type TogglerArgs = {
  key: keyof fabric.IText;
  value: string | boolean;
  event: fabric.EventName;
};

type Props = {
  activeTextObject: fabric.IText;
  valueToWatch: keyof fabric.IText;
  onToggle: (args: TogglerArgs) => void;
  title?: string;
  icon: string;
};

export const Toggler = ({
  valueToWatch,
  activeTextObject,
  onToggle,
  title,
  icon,
}: Props) => {
  const [selected, setSelected] = useState(false);
  const value = useCanvasAsState(activeTextObject, 'object:modified', [
    valueToWatch,
  ]);
  const isSelected = (value: string | boolean) => {
    if (typeof value === 'string') {
      return value !== 'normal';
    }
    return value;
  };
  const handleClick = () => {
    setSelected(!selected);
    onToggle({
      event: 'object:modified',
      key: valueToWatch,
      value: value[valueToWatch],
    });
  };
  return (
    <button
      title={title}
      onClick={handleClick}
      className={`${style.toggler} ${
        isSelected(value?.[valueToWatch]) && style.selected
      }`}
    >
      <img
        src={icon}
        alt=''
      />
    </button>
  );
};
