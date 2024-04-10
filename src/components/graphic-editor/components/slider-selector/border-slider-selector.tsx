import { SliderSelector } from '.';
import { ColorSelector } from '../color-selector';
import borderIcon from '../../../../assets/border-width.svg';

export const BorderSliderSelector = ({
  activeObject,
}: {
  activeObject: fabric.Object;
}) => (
  <SliderSelector
    sliderProps={{
      title: 'Spessore bordo',
      step: 1,
      maxValue: 200,
    }}
    valueUnit={' px'}
    multiplier={1}
    childrenAbove={
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '45px',
        }}
      >
        <span>Border color</span>
        <ColorSelector
          valueToWatch='stroke'
          section='border-color'
          object={activeObject}
          border
        />
      </div>
    }
    key={'border'}
    valueToWatch='strokeWidth'
    icon={borderIcon}
    activeObject={activeObject}
    title='border width'
  />
);
