import { useAtom } from 'jotai';
import { ToolbarsSections, selectedItemTypeAtom } from '../../canvas-context/atoms/atoms';
import { TextToolbar } from './text-toolbar';
import { ElementToolbar } from './element-toolbar';
import { CanvasToolbar } from './canvas-toolbar';
import { ImageToolbar } from './image-toolbar';

export const Toolbar = () => {
  const [selectedItemType] = useAtom(selectedItemTypeAtom);
  let CurrentToolbar: React.FC;
  if (Toolbars[selectedItemType] !== undefined) {
    CurrentToolbar = Toolbars[selectedItemType] as React.FC;
  } else {
    return <></>;
  }
  return <CurrentToolbar />;
};

const Toolbars: Partial<{ [key in ToolbarsSections]: React.FC }> = {
  text: TextToolbar,
  canvas: CanvasToolbar,
  elements: ElementToolbar,
  images: ImageToolbar,
};
