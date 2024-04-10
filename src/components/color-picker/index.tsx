import { HexColorInput, HexColorPicker } from 'react-colorful';
import { BackgroundCard } from '../background-card';
import useEyeDropper from '../../hooks/use-eye-dropper';
import { EyeDropper } from '../eye-dropper';
import './style.sass';

type Props = {
  color: string;
  onChange: (color: string) => void;
  onEyeDropError: (e: any) => void;
};

export const ColorPicker = ({ color, onChange, onEyeDropError }: Props) => {
  const { isSupported } = useEyeDropper();
  return (
    <BackgroundCard
      className='react-colorful__aigot-container'
      padding={9}
    >
      <HexColorPicker
        color={color}
        onChange={onChange}
      />
      <div className='input-eyedropper'>
        <BackgroundCard
          className='react-colorful_aigot-input'
          padding={8}
        >
          <HexColorInput
            prefixed={true}
            color={color}
            onChange={onChange}
          />
        </BackgroundCard>
        {isSupported && (
          <EyeDropper
            onChange={onChange}
            onEyeDropError={onEyeDropError}
          />
        )}
      </div>
    </BackgroundCard>
  );
};
