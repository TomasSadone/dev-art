import { isElement } from 'components/graphic-editor/helpers/is-element';
import { fabric } from 'fabric';

type Props = { object: fabric.Object };

export const LayerSvg = ({ object }: Props) => {
  const removePositioning = (object: Object): fabric.Object => {
    const newObject = {} as fabric.Object;
    Object.setPrototypeOf(newObject, object);
    newObject.left = 0;
    newObject.top = 0;
    newObject.scaleY = 1;
    newObject.scaleX = 1;
    newObject.angle = 0;
    if (newObject.height && newObject.width && newObject.width > 250) {
      console.log(newObject.width);
      newObject.height = newObject.height / (newObject.width / 250);
      newObject.width = 250;
    }
    return newObject;
  };

  if (isElement(object)) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="62"
        height="62"
        viewBox="0 0 62 62"
        fill="none"
        // it's safe because we now what we are appending, a fabric object converted to svg
        dangerouslySetInnerHTML={{ __html: removePositioning(object).toSVG() }}
      ></svg>
    );
  } else if (object instanceof fabric.Image) {
    return (
      <img
        style={{ overflow: 'hidden' }}
        src={removePositioning(object).toDataURL({})}
        alt=""
      />
    );
  }
};
