import { useEffect, useLayoutEffect, useRef } from 'react';
import { fabric } from 'fabric';
import { useCanvasContext } from '../../canvas-context/useCanvasContext';
import style from './style.module.sass';
import { useOnOutsideClick } from '../../../../hooks/use-on-outside-click';
import {
  selectedItemTypeAtom,
  threePointsMenuPositionAtom,
} from '../../canvas-context/atoms/atoms';
import { useAtom } from 'jotai';
import Trash from '../../assets/trash.svg';
import ThreeDots from '../../assets/threedots.svg';
import { Transform } from 'fabric/fabric-impl';
import { FirstLevelThreePointsMenu } from '../three-points-menu';
import { renderIcon } from 'components/graphic-editor/helpers/render-icon';

const createImage = (src: string): HTMLImageElement => {
  const image = new Image();
  image.src = src;
  image.onload = function () {};
  return image;
};

const trashImage = createImage(Trash);
const threeDotsImage = createImage(ThreeDots);

fabric.Object.prototype.controls.deleteControl = new fabric.Control({
  x: 0.5,
  y: -0.5,
  offsetY: 10,
  offsetX: -50,
  cursorStyle: 'pointer',
  mouseUpHandler: removeObject,
  render: renderIcon(trashImage),
  sizeX: 24,
  sizeY: 24,
});
fabric.Object.prototype.controls.threePointsControl = new fabric.Control({
  x: 0.5,
  y: -0.5,
  offsetY: 10,
  offsetX: -10,
  cursorStyle: 'pointer',
  render: renderIcon(threeDotsImage),
  sizeX: 24,
  sizeY: 24,
});

function removeObject(_e: MouseEvent, transform: Transform) {
  const target = transform.target;
  if (!target.canvas) return false;
  const canvas = target.canvas;
  canvas.remove(target);
  canvas.requestRenderAll();
  return false;
}

const Canvas = () => {
  const canvasDomRef = useRef<HTMLCanvasElement | null>(null);
  // this ref exists because fabric wraps our canvas in other elements,
  // and that creates unexpected behaviors with outsideclick if we pass it that ref:
  const libraryWrapperRef = useRef<HTMLDivElement | null>(null);
  const canvasInstanceRef = useCanvasContext();
  const [selectedItemType, setSelectedItemType] = useAtom(selectedItemTypeAtom);
  const [positionThreePointsMenu, setPositionThreePointsMenu] = useAtom(
    threePointsMenuPositionAtom,
  );

  const onThreePointsClick = (e: MouseEvent) => {
    if (
      !canvasInstanceRef ||
      !canvasInstanceRef.current?.height ||
      !canvasInstanceRef.current?.width
    )
      return false;
    let pointer = canvasInstanceRef.current!.getPointer(e);
    let posX =
      canvasInstanceRef.current!.height > pointer.x + 160 ? pointer.x - 10 : pointer.x - 160;
    let posY =
      canvasInstanceRef.current!.width > pointer.y + 250 ? pointer.y + 10 : pointer.y - 250;

    if (positionThreePointsMenu !== null) {
      setPositionThreePointsMenu(null);
      return false;
    }
    setPositionThreePointsMenu({ x: posX, y: posY });
    return false;
  };

  const onOutsideClick = () => {
    if (selectedItemType === 'canvas') {
      setSelectedItemType('');
    }
  };

  useOnOutsideClick([libraryWrapperRef], onOutsideClick, [selectedItemType]);

  useLayoutEffect(() => {
    if (libraryWrapperRef.current) {
      const { current } = libraryWrapperRef;
      const smallerDimention =
        current.clientWidth < current.clientHeight
          ? current.clientWidth
          : current.clientHeight;
      const totalPadding = 96; //(px)
      canvasInstanceRef.current = initCanvas(smallerDimention - totalPadding);
    }
  }, []);
  useEffect(() => {
    fabric.Object.prototype.controls.threePointsControl.mouseUpHandler = onThreePointsClick;
  }, [positionThreePointsMenu]);

  function initCanvas(size: number) {
    return new fabric.Canvas(canvasDomRef.current, {
      width: size,
      height: size,
      backgroundColor: 'white',
      preserveObjectStacking: true,
    });
  }

  return (
    <div className={style.canvasContainer}>
      <div className={style.libraryWrapper} ref={libraryWrapperRef}>
        <canvas
          ref={canvasDomRef}
          className={`${style.canvas} ${selectedItemType === 'canvas' && style.active}`}
        />
        {positionThreePointsMenu && (
          <FirstLevelThreePointsMenu position={positionThreePointsMenu} z={20} />
        )}
      </div>
    </div>
  );
};

export { Canvas };
