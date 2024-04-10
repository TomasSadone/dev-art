import { fabric } from 'fabric';

export function renderIcon(icon: HTMLImageElement) {
  return function renderIcon(
    ctx: CanvasRenderingContext2D,
    left: number,
    top: number,
    _styleOverride: any,
    fabricObject: fabric.Object,
  ) {
    let size = 27;
    let padding = size * 0.25;
    let imgSize = 24;
    ctx.save();
    ctx.translate(left, top);
    ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle as number));
    ctx.fillStyle = 'white';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
    ctx.beginPath();
    ctx.arc(-size / 2 + padding, -size / 2 + padding, padding, Math.PI, 1.5 * Math.PI);
    ctx.lineTo(size / 2 - padding, -size / 2);
    ctx.arc(size / 2 - padding, -size / 2 + padding, padding, 1.5 * Math.PI, 2 * Math.PI);
    ctx.lineTo(size / 2, size / 2 - padding);
    ctx.arc(size / 2 - padding, size / 2 - padding, padding, 0, 0.5 * Math.PI);
    ctx.lineTo(-size / 2 + padding, size / 2);
    ctx.arc(-size / 2 + padding, size / 2 - padding, padding, 0.5 * Math.PI, Math.PI);
    ctx.closePath();
    ctx.fill();
    ctx.drawImage(icon, -imgSize / 2, -imgSize / 2, imgSize, imgSize);
    ctx.restore();
  };
}
