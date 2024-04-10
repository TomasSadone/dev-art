import { useCanvasContext } from 'components/graphic-editor/canvas-context/useCanvasContext';
import useCanvasAsState from 'components/graphic-editor/hooks/use-canvas-as-state';
import { OpacitySliderSelector } from '../../slider-selector/opacity-slider-selector';
import { BackgroundCard } from '../../../../background-card';
import style from './style.module.sass';
import { Tooltip } from '../../../../tooltip';
import flipX from '../../../../../assets/flip-x.svg';
import flipY from '../../../../../assets/flip-y.svg';

export const ImageToolbar = () => {
  const canvasInstanceRef = useCanvasContext();

  if (!canvasInstanceRef.current) return <></>;
  const { _activeObject } = useCanvasAsState(
    canvasInstanceRef.current,
    'after:render',
    ['_activeObject']
  );

  const rotateImage = (objectProperty: 'flipY' | 'flipX') => {
    _activeObject.set(objectProperty, !_activeObject[objectProperty]);
    canvasInstanceRef?.current?.renderAll();
  };

  return (
    <div className={style.container}>
      <Tooltip
        trigger='hover'
        hoverItem={<p>Capovogli</p>}
      >
        <BackgroundCard className={style.flipControls}>
          <button onClick={() => rotateImage('flipY')}>
            <img
              src={flipY}
              alt=''
            />{' '}
            Capovogli verticalmente
          </button>
          <button onClick={() => rotateImage('flipX')}>
            <img
              src={flipX}
              alt=''
            />{' '}
            Capovogli orizzontalmente
          </button>
        </BackgroundCard>
      </Tooltip>

      <OpacitySliderSelector activeObject={_activeObject} />
    </div>
  );
};
