import { fabric } from 'fabric';
import Align from './assets/allineate.svg';
import CenterVertically from './assets/centro.svg';
import CenterHorizontally from './assets/centro2.svg';
import Copy from './assets/copy.svg';
import Paste from './assets/paste.svg';
import Trash from './assets/trash.svg';
import Duplicate from './assets/duplicate.svg';
import AlignHigh from './assets/alto.svg';
import AlignLow from './assets/basso.svg';
import AlignLeft from './assets/sinistra.svg';
import AlignRight from './assets/destra.svg';
import Layers from './assets/layers.svg';
import SendLayerUpwards from './assets/up.svg';
import SendLayerDownwards from './assets/down.svg';
import SendLayerTop from './assets/bring-to-front.svg';
import SendLayerBottom from './assets/send-to-back.svg';

type BaseMenuItem = {
  icon: string;
  name: string;
};

type MenuItemWithChildren = BaseMenuItem & {
  children: MenuItem[];
  onClick?: never;
};

type ClickableMenuItem = BaseMenuItem & {
  onClick: (canvas: fabric.Canvas) => void;
  children?: never;
};

export type MenuItem = MenuItemWithChildren | ClickableMenuItem;

export const menuInfo: MenuItem[] = [
  {
    icon: Copy,
    name: 'Copia',
    onClick: handleCopy,
  },
  {
    icon: Paste,
    name: 'Incolla',
    onClick: paste,
  },
  {
    icon: Duplicate,
    name: 'Duplica',
    onClick: duplicate,
  },
  {
    icon: Trash,
    name: 'Elimina',
    onClick: deleteObject,
  },
  {
    icon: Layers,
    name: 'Livelli ',
    children: [
      {
        icon: SendLayerTop,
        name: 'Portare in primo piano',
        onClick: bringToFront,
      },

      {
        icon: SendLayerUpwards,
        name: 'Porta in alto',
        onClick: bringForward,
      },
      {
        icon: SendLayerDownwards,
        name: 'Porta in basso',
        onClick: sendBackwards,
      },
      {
        icon: SendLayerBottom,
        name: 'Mandare indietro',
        onClick: sendToBack,
      },
    ],
  },
  {
    icon: Align,
    name: 'Allinea',
    children: [
      {
        icon: AlignHigh,
        name: 'Alto',
        onClick: alignTop,
      },
      {
        icon: CenterVertically,
        name: 'Centro',
        onClick: alignCenterVertically,
      },
      {
        icon: AlignLow,
        name: 'Basso',
        onClick: alignBottom,
      },
      {
        icon: AlignLeft,
        name: 'Sinistra',
        onClick: alignLeft,
      },
      {
        icon: CenterHorizontally,
        name: 'Centro',
        onClick: alignCenterHorizontally,
      },
      {
        icon: AlignRight,
        name: 'Destra',
        onClick: alignRight,
      },
    ],
  },
];

function copy(canvas: fabric.Canvas): fabric.Group | undefined {
  if (canvas.getActiveObject() === null) return;
  let returnClone: fabric.Group | undefined;
  canvas.getActiveObject()?.clone(function (cloned: fabric.Group) {
    returnClone = cloned;
  });
  return returnClone;
}

let clipboard: fabric.Group | undefined;
function handleCopy(canvas: fabric.Canvas) {
  clipboard = copy(canvas);
}

function paste(canvas: fabric.Canvas) {
  const object = canvas.getActiveObject();
  if (!object) return;
  object.clone(function (clonedObj: fabric.Group) {
    canvas.discardActiveObject();
    const left = clonedObj.left || 10;
    const top = clonedObj.top || 10;
    clonedObj.set({
      left: left + 10 || 10,
      top: top + 10 || 10,
      evented: true,
    });
    if (clonedObj.type === 'activeSelection') {
      // active selection needs a reference to the canvas.
      clonedObj.canvas = canvas;
      clonedObj.forEachObject(function (obj) {
        canvas.add(obj);
      });
      // this should solve the unselectability
      clonedObj.setCoords();
    } else {
      canvas.add(clonedObj);
    }
    canvas.setActiveObject(clonedObj);
    canvas.requestRenderAll();
  });
}

function duplicate(canvas: fabric.Canvas) {
  const clone = copy(canvas);
  if (clone) paste(canvas);
}

function callMethodOnObj(canvas: fabric.Canvas, method: keyof fabric.Canvas) {
  if (typeof canvas[method] === 'function') {
    const object = canvas.getActiveObject();
    if (!object) return;
    (canvas[method] as Function)(object);
    canvas.requestRenderAll();
  }
}

function deleteObject(canvas: fabric.Canvas) {
  callMethodOnObj(canvas, 'remove');
}

function bringToFront(canvas: fabric.Canvas) {
  callMethodOnObj(canvas, 'bringToFront');
}

function sendToBack(canvas: fabric.Canvas) {
  callMethodOnObj(canvas, 'sendToBack');
}

function bringForward(canvas: fabric.Canvas) {
  callMethodOnObj(canvas, 'bringForward');
}

function sendBackwards(canvas: fabric.Canvas) {
  callMethodOnObj(canvas, 'sendBackwards');
}

function alignTop(canvas: fabric.Canvas) {
  const object = canvas.getActiveObject();
  if (!object) return;
  object.set('top', 0);
  canvas.requestRenderAll();
  //   TODO cerrar threepointsmenu aca y en las proximas de alineamiento
}
function alignBottom(canvas: fabric.Canvas) {
  const object = canvas.getActiveObject();
  if (!object) return;
  const height = canvas.getHeight();
  const objectHeight = object.height || 100;
  const objectScaleY = object.scaleY || 1;
  object.set('top', height - objectHeight * objectScaleY);
  canvas.requestRenderAll();
}
function alignLeft(canvas: fabric.Canvas) {
  const object = canvas.getActiveObject();
  if (!object) return;
  object.set('left', 0);
  canvas.requestRenderAll();
}
function alignRight(canvas: fabric.Canvas) {
  const object = canvas.getActiveObject();
  if (!object) return;
  const width = canvas.getWidth();
  const objectWidth = object.width || 100;
  const objectScaleX = object.scaleX || 1;
  object.set('left', width - objectWidth * objectScaleX);
  canvas.requestRenderAll();
}

function alignCenterVertically(canvas: fabric.Canvas) {
  const object = canvas.getActiveObject();
  if (!object) return;
  const centerY = canvas.getHeight() / 2;
  const objectHeight = object.height || 100;
  const objectScaleY = object.scaleY || 1;
  object.set({
    top: centerY - (objectHeight * objectScaleY) / 2,
  });
  canvas.requestRenderAll();
}

function alignCenterHorizontally(canvas: fabric.Canvas) {
  const object = canvas.getActiveObject();
  if (!object) return;
  const centerX = canvas.getWidth() / 2;
  const objectWidth = object.width || 100;
  const objectScaleX = object.scaleX || 1;
  object.set({
    left: centerX - (objectWidth * objectScaleX) / 2,
  });
  canvas.requestRenderAll();
}
