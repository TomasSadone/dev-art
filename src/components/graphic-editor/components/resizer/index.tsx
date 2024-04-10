import { SliderInput } from 'components/form/slider-input';
import { useCanvasContext } from 'components/graphic-editor/canvas-context/useCanvasContext';
import { forwardRef, useImperativeHandle, useState } from 'react';
import style from './style.module.sass';

type Size = {
  width: number;
  height: number;
};

let initialSize: Size;

export type ExposedMehtods = {
  setInitialSize: (size: Size) => void;
};
export const Resizer = forwardRef((_, ref) => {
  const canvasInstanceRef = useCanvasContext();
  const [zoom, setZoom] = useState(1);

  useImperativeHandle(ref, function (): ExposedMehtods {
    return {
      setInitialSize({ height, width }: Size) {
        setZoom(1);
        canvasInstanceRef.current?.setZoom(1);
        initialSize = { height, width };
      },
    };
  });

  const handleSliderChange = (value: number) => {
    if (!canvasInstanceRef.current) return;
    if (!initialSize) {
      initialSize = {
        height: canvasInstanceRef.current.getHeight(),
        width: canvasInstanceRef.current.getWidth(),
      };
    }
    setDimentions(value, canvasInstanceRef.current);
  };

  const setDimentions = (zoom: number, canvas: fabric.Canvas): void => {
    canvas.setZoom(zoom);
    canvas.setHeight(initialSize.height * zoom);
    canvas.setWidth(initialSize.width * zoom);
    canvas.renderAll();
    setZoom(zoom);
  };

  return (
    <div className={style.container}>
      <div className={style.group}>
        <SliderInput
          onChange={handleSliderChange}
          maxValue={5}
          minValue={0.1}
          step={0.01}
          title="size"
          value={zoom}
        />
        <span>{`${Math.round(zoom * 100)}%`}</span>
      </div>
    </div>
  );
});
