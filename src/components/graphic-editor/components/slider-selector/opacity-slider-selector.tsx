import { SliderSelector } from '.';
import opacity from '../../../../assets/opacity.svg';

export const OpacitySliderSelector = ({
  activeObject,
}: {
  activeObject: fabric.Object;
}) => (
  <SliderSelector
    valueUnit='%'
    sliderProps={{
      title: 'Opacità',
      maxValue: 1,
      step: 0.01,
    }}
    multiplier={100}
    key={'opacity'}
    valueToWatch='opacity'
    icon={opacity}
    activeObject={activeObject}
    title='opacity'
  />
);
