import { ColorPicker } from '../../../../color-picker';
import { Tooltip } from '../../../../tooltip';
import addcolor from './assets/addcolor.svg';
import style from './style.module.sass';
import { Color } from '../../../../color';

type Props = {
  title: string;
  color: string;
  handleColorChange: (color: string) => void;
};

const colorPallette = [
  '#000000',
  '#686868',
  '#9a9a9a',
  '#d3d3d3',
  '#ffffff',
  '#d69253',
  '#fb9333',
  '#ffd382',
  '#fff4e0',
  '#ffe3e2',
  '#45342b',
  '#86291d',
  '#9d4c32',
  '#cf5542',
  '#ce8786',
  '#003447',
  '#2580bb',
  '#74b9f2',
  '#68cf64',
  '#368b70',
];

export const ColorSideMenu = ({
  handleColorChange,
  color = '#000',
  title,
}: Props) => {
  const handleClick = (color: string) => {
    handleColorChange(color);
  };
  return (
    <div className={style.colorSideMenu}>
      <div className={style.section}>
        <p className={style.text}>{title}</p>
        <Tooltip
          trigger='click'
          hoverItem={<img src={addcolor} />}
        >
          <ColorPicker
            color={color as string}
            onChange={handleClick}
            onEyeDropError={() => handleClick('#000')}
          />
        </Tooltip>
      </div>
      <div className={style.section}>
        <p className={style.text}>Predefined colors</p>
        <div className={style.colors}>
          {colorPallette.map((color) => (
            <button
              key={color}
              className={style.predefinedColorInteractable}
              onClick={() => handleClick(color)}
            >
              <Color
                hexCode={color}
                key={color}
                className={style.predefinedColor}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
