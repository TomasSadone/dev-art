import { useCanvasContext } from '../../../canvas-context/useCanvasContext';
import useCanvasAsState from '../../../hooks/use-canvas-as-state';
import { ColorSelector } from '../../color-selector';
import { BorderSliderSelector } from '../../slider-selector/border-slider-selector';
import { OpacitySliderSelector } from '../../slider-selector/opacity-slider-selector';
import style from './style.module.sass';

export const ElementToolbar = () => {
  const canvasInstanceRef = useCanvasContext();
  if (!canvasInstanceRef.current) return <></>;
  const { _activeObject } = useCanvasAsState(canvasInstanceRef.current, 'after:render', [
    '_activeObject',
  ]);
  const borderEditable = _activeObject.type === 'rect' || _activeObject.type === 'circle';

  return (
    <div className={style.elementToolbar}>
      <ColorSelector valueToWatch="fill" section="element-color" object={_activeObject} />
      {borderEditable && <BorderSliderSelector activeObject={_activeObject} />}
      <OpacitySliderSelector activeObject={_activeObject} />
    </div>
  );
};
