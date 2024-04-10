import { fabric } from 'fabric';

export type Element = fabric.Path | fabric.Rect | fabric.Circle;

export const isElement = (object: fabric.Object) =>
  object instanceof fabric.Path ||
  object instanceof fabric.Rect ||
  object instanceof fabric.Circle;
