import { useCanvasContext } from '../../../canvas-context/useCanvasContext';
import useCanvasAsState from '../../../hooks/use-canvas-as-state';
import { FontSizeHandler } from './font-size-handler';
import { TextAlignmentToggler } from './text-alignment-toggler';
import { Toggler, TogglerArgs } from './toggler';
import style from './style.module.sass';

import { FontFamilySelector } from './font-family-selector';
import { ColorSelector } from '../../color-selector';
import { handleSetSelectedItemTypeAtom } from '../../../canvas-context/atoms/atoms';
import { useAtom } from 'jotai';
import { OpacitySliderSelector } from '../../slider-selector/opacity-slider-selector';

import bold from '../../../../../assets/bold.svg';
import italic from '../../../../../assets/italic.svg';
import underlined from '../../../../../assets/underlined.svg';
import crossed from '../../../../../assets/bold.svg';
import upperLowerCase from '../../../../../assets/upper-lower-case.svg';

const TextToolbar = () => {
  const canvasInstanceRef = useCanvasContext();
  if (!canvasInstanceRef.current) return <div></div>;
  const [, setSelectedItemType] = useAtom(handleSetSelectedItemTypeAtom);

  const { _activeObject } = useCanvasAsState(
    canvasInstanceRef.current!,
    'after:render',
    ['_activeObject']
  ) as { _activeObject: fabric.IText };

  //   prevent error on section change
  if (!_activeObject) setSelectedItemType('');

  const onToggle = ({ event, key, value }: TogglerArgs) => {
    _activeObject.set(key, value);
    _activeObject.fire(event);
    canvasInstanceRef.current!.renderAll();
  };

  const onBoldToggle = (args: TogglerArgs) => {
    onStringToggle(args, 'bold');
  };
  const onStyleToggle = (args: TogglerArgs) => {
    onStringToggle(args, 'italic');
  };
  const onStringToggle = (
    args: TogglerArgs,
    notNormalValue: 'italic' | 'bold'
  ) => {
    if (args.value === 'normal') {
      onToggle({ ...args, value: notNormalValue });
    } else if (args.value === notNormalValue) {
      onToggle({ ...args, value: 'normal' });
    }
  };
  const onBooleanToggle = (args: TogglerArgs) => {
    onToggle({ ...args, value: !args.value });
  };

  const handleUppercaseToggle = (args: TogglerArgs) => {
    (_activeObject as any).isUppercase = !args.value;
    const setUppercase = () => {
      if (args.value) {
        return _activeObject.text?.toLowerCase();
      } else {
        return _activeObject.text?.toUpperCase();
      }
    };
    _activeObject.text = setUppercase();
    _activeObject.dirty = true;
    _activeObject.fire('object:modified');
    if (canvasInstanceRef.current) {
      canvasInstanceRef.current.renderAll();
    }
  };
  const isUpperCase = 'isUppercase' as keyof fabric.IText;

  return (
    <div className={style.textToolbar}>
      <ColorSelector
        section='text-color'
        valueToWatch='fill'
        object={_activeObject}
      />
      <FontFamilySelector activeTextObject={_activeObject}></FontFamilySelector>
      <FontSizeHandler activeTextObject={_activeObject} />
      <div className={style.groupedButtons}>
        <Toggler
          icon={bold}
          activeTextObject={_activeObject}
          onToggle={onBoldToggle}
          valueToWatch='fontWeight'
          title='font weight'
        />
        <Toggler
          icon={italic}
          activeTextObject={_activeObject}
          onToggle={onStyleToggle}
          valueToWatch='fontStyle'
          title='font style'
        />
        <Toggler
          icon={underlined}
          activeTextObject={_activeObject}
          onToggle={onBooleanToggle}
          valueToWatch='underline'
          title='underline'
        />
        <Toggler
          icon={crossed}
          activeTextObject={_activeObject}
          onToggle={onBooleanToggle}
          valueToWatch='linethrough'
          title='line through'
        />
        <Toggler
          icon={upperLowerCase}
          activeTextObject={_activeObject}
          onToggle={handleUppercaseToggle}
          valueToWatch={isUpperCase}
          title='uppercase'
        />
        <TextAlignmentToggler
          title='text alignment'
          activeTextObject={_activeObject}
        />
        <OpacitySliderSelector activeObject={_activeObject} />
      </div>
    </div>
  );
};

export { TextToolbar };
