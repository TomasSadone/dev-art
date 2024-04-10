import { useAtom } from 'jotai';
import {
  SidemenusSections,
  selectedSectionAtom,
} from '../../canvas-context/atoms/atoms';
import { TextSidemenu } from './text-side-menu';
import style from './style.module.sass';
import { ElementsSidemenu } from './elements-side-menu';
import { TextColorSM } from './color-side-menu/object-color-sm/text-color-sm';
import { ElementColorSM } from './color-side-menu/object-color-sm/element-color-sm';
import { BorderColorSM } from './color-side-menu/object-color-sm/border-color-sm';
import { LayersSubmenu } from './layers-submenu';
import {
  ImagesSidemenu,
  Props as ImageSidemenuProps,
} from './images-side-menu';
import { CanvasColorSM } from './color-side-menu/canvas-color-sm';
// import { UploadsSidemenu, Props as UploadSidemenuProps } from './uploads-side-menu';

// TODO unificar o sidemenus o submenos, en un lado son de una manera y en otro de otra. ver base editor

type SubmenuProps = ImageSidemenuProps;

type SubmenuComponent = React.FC<SubmenuProps>;

export const Sidemenu: React.FC<SubmenuProps> = (props) => {
  const [selectedSection] = useAtom(selectedSectionAtom);
  let CurrentSubmenu: React.FC;
  if (Sidemenus[selectedSection] !== undefined) {
    CurrentSubmenu = Sidemenus[selectedSection] as React.FC;
  } else {
    return <></>;
  }
  if (selectedSection === 'uploads' || selectedSection === 'images') {
    CurrentSubmenu.defaultProps = props;
  }
  return (
    <div className={style.sideMenus}>
      <CurrentSubmenu />
    </div>
  );
};

const Sidemenus: Partial<{ [key in SidemenusSections]: SubmenuComponent }> = {
  text: () => <TextSidemenu />,
  elements: () => <ElementsSidemenu />,
  images: ImagesSidemenu,
  layers: () => <LayersSubmenu />,
  //   uploads: UploadsSidemenu,
  'element-color': () => <ElementColorSM />,
  'border-color': () => <BorderColorSM />,
  'text-color': () => <TextColorSM />,
  'canvas-color': () => <CanvasColorSM />,
};
