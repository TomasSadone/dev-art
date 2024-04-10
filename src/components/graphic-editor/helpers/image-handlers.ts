import { fabric } from 'fabric';
import { v4 as uuid } from 'uuid';

export const createImage = async (
  src: string,
  canvasSize: { width?: number; height?: number },
): Promise<fabric.Image> => {
  return new Promise((resolve, reject) => {
    try {
      fabric.Image.fromURL(src, (image) => {
        if (!image.width || !image.height || !canvasSize?.width || !canvasSize?.height) {
          resolve(image);
          return;
        }

        const isImageWiderThanCanvas = image.width > canvasSize?.width;
        const isImageTallerThanCanvas = image.height > canvasSize?.height;

        if (image.width >= image.height) {
          if (isImageWiderThanCanvas) {
            image.scaleToWidth(canvasSize.width);
          }
        } else {
          if (isImageTallerThanCanvas) {
            image.scaleToHeight(canvasSize.height);
          }
        }
        resolve(image);
      });
    } catch {
      reject('An error occured creating the image');
    }
  });
};

export const attachImage = (image: fabric.Image, canvas: fabric.Canvas) => {
  image.set('name', uuid()); //the name set to an uuid it's what makes the layers work
  image.set('opacity', 1);
  canvas.add(image);
  canvas.setActiveObject(image);
};
