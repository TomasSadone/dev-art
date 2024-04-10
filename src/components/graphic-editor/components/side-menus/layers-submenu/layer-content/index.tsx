import { LayerSvg } from '../layer-svg';
import { fabric } from 'fabric';
import { isElement } from 'components/graphic-editor/helpers/is-element';

type Props = {
  object: fabric.IText | fabric.Rect | fabric.Circle | fabric.Path;
};

export const LayerContent = ({ object }: Props) => {
  if (isElement(object) || object instanceof fabric.Image) {
    return <LayerSvg object={object} />;
  } else if (object instanceof fabric.IText) {
    return (
      <div
        className="h-[3.18rem] flex items-center overflow-hidden bg-[#f2f4f7] w-full px-2 rounded"
        style={{
          fontFamily: object.fontFamily,
          color: object.fill as string,
          opacity: object.opacity,
        }}
      >
        {object.text}
      </div>
    );
  }
  return <></>;
};
