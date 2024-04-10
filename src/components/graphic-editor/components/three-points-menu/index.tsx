import style from './style.module.sass';
import { MenuItem, menuInfo } from './menu-info';
import { useState } from 'react';
import { useCanvasContext } from 'components/graphic-editor/canvas-context/useCanvasContext';
import chevronRight from './assets/chevron-right.svg';
type Props = {
  position: { x: number; y: number; bottom?: number; right?: number };
  z?: number;
  items: MenuItem[];
};

export const FirstLevelThreePointsMenu = ({ position, z }: Omit<Props, 'items'>) => {
  return <ThreePointsMenu position={position} z={z} items={menuInfo} />;
};

export const ThreePointsMenu = ({ items, position, z = 20 }: Props) => {
  const canvasInstanceRef = useCanvasContext();
  if (!canvasInstanceRef.current) return <></>;
  const [hoverIndex, sethoverIndex] = useState<number | null>(null);
  const handleMouseEnter = (item: MenuItem, index: number) => {
    if (item.children) {
      sethoverIndex(index);
    }
  };
  const handleMouseLeave = () => {
    if (sethoverIndex) sethoverIndex(null);
  };
  return (
    <ul
      onMouseLeave={handleMouseLeave}
      style={{
        top: position.y,
        left: position.x,
        zIndex: z,
        right: position.right,
        // bottom: position.bottom,
      }}
      className={style.menu}
    >
      {items.map((item, i) => {
        return (
          <li key={item.icon} onMouseEnter={() => handleMouseEnter(item, i)}>
            <button
              className={style.button}
              onClick={() => {
                item.onClick && item.onClick(canvasInstanceRef!.current as fabric.Canvas);
              }}
            >
              <div className={style.iconTitle}>
                <img src={item.icon} alt="" />
                <span>{item.name}</span>
              </div>
              {item.children && <img src={chevronRight} alt="" />}
            </button>
          </li>
        );
      })}
      {hoverIndex && items[hoverIndex].children && (
        <ThreePointsMenu
          position={{ x: 0, y: 0, bottom: 0, right: 0 }}
          items={items[hoverIndex].children as MenuItem[]}
          z={z + 1}
        />
      )}
    </ul>
  );
};
