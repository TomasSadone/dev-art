import { useCanvasContext } from '../../../canvas-context/useCanvasContext';
import style from './style.module.sass';
import { fabric } from 'fabric';
import circle from './assets/ellipse.svg';
import square from './assets/square.svg';
import rectangle from './assets/rectangle.svg';
import pillRectangle from './assets/pill-rectangle.svg';
import radiusRectangle from './assets/radius-rectangle.svg';
import restaurant from './assets/restaurant.svg';
import location_on from './assets/location-on.svg';
import call from './assets/call.svg';
import eco from './assets/eco.svg';
import star from './assets/star.svg';
import award_star from './assets/award-star.svg';
import facebook from './assets/facebook.svg';
import whatsapp from './assets/whatsapp.svg';
import { useAtom } from 'jotai';
import { handleSetSelectedItemTypeAtom } from '../../../canvas-context/atoms/atoms';
import { v4 as uuid } from 'uuid';

const icons = [
  circle,
  square,
  rectangle,
  pillRectangle,
  radiusRectangle,
  restaurant,
  location_on,
  call,
  eco,
  star,
  award_star,
  facebook,
  whatsapp,
];

/*
esta function en el elemento cuando lo cargamos desde loadsvgfromurl.
funciona para "pillShape", porque tiene el calculo de rx que es justo para esa forma.
ver si puedo hacer un calculo generico, o pasar una funcion que calcule el rx/ry para cada elemento individualmente.
esto va a haber que injectarlo despues cuando se carga desde json

ahora que pongo scalex en 3 se podria resetear a ese valor en vez de a 1

elementAdded.on('modified', function () {
        const obj: fabric.Object | fabric.Group = this;
        const width = obj.width * obj.scaleX;
        const height = obj.height * obj.scaleY;
        const radius = height / 2;
        obj.set({ height, width, scaleX: 1, scaleY: 1, rx: radius, ry: radius });
        canvasInstanceRef.current?.renderAll();
      });
*/

export const ElementsSidemenu = () => {
  const canvasInstanceRef = useCanvasContext();
  const [, setSelectedItemType] = useAtom(handleSetSelectedItemTypeAtom);
  if (!canvasInstanceRef.current) return <></>;
  const handleAddElement = (url: string) => {
    fabric.loadSVGFromURL(url, (result: fabric.Object[], options) => {
      const elementAdded = fabric.util.groupSVGElements(result, options);
      elementAdded.set({
        left: 10,
        top: 10,
        opacity: 1.0,
        padding: 0,
        strokeUniform: true,
        fill: '#667085',
        subTargetCheck: true,
        scaleX: 3,
        scaleY: 3,
        strokeWidth: 0,
        name: uuid(), //the name set to an uuid it's what makes the layers work
      });
      canvasInstanceRef.current?.add(elementAdded);
      canvasInstanceRef.current?.setActiveObject(elementAdded);
      canvasInstanceRef.current?.renderAll();
      setSelectedItemType('elements');
    });
  };
  canvasInstanceRef.current.on('object:modified', function (e) {});
  return (
    <div className={style.elements}>
      {icons.map((icon) => (
        <button key={icon} onClick={() => handleAddElement(icon)}>
          <img src={icon} alt="shape" />
        </button>
      ))}
    </div>
  );
};
