import { useAtom } from 'jotai';
import { Sidebar as BaseSidebar } from '../../../base-editor/side-bar';
import {
  SidemenusSections,
  handleSetSelectedItemTypeAtom,
  selectedSectionAtom,
} from '../../canvas-context/atoms/atoms';
import folder from '../../../../assets/folder.svg';
import text from '../../../../assets/text.svg';
import images from '../../../../assets/images.svg';
import layers from '../../../../assets/layers.svg';
import elements from '../../../../assets/elements.svg';

const Sidebar = () => {
  const [selectedSection, setSelectedSection] = useAtom(selectedSectionAtom);
  const [, handleSetSelectedItemType] = useAtom(handleSetSelectedItemTypeAtom);
  const handleSelectSection = (section: SidemenusSections) => {
    setSelectedSection(section);
    handleSetSelectedItemType('');
  };
  return (
    <BaseSidebar
      buttons={[
        {
          icon: images,
          onClick: () => handleSelectSection('images'),
          title: 'Images',
          isSelected: selectedSection === 'images',
        },
        {
          icon: text,
          onClick: () => handleSelectSection('text'),
          title: 'Text',
          isSelected: selectedSection === 'text',
        },
        {
          icon: elements,
          onClick: () => handleSelectSection('elements'),
          title: 'Elements',
          isSelected: selectedSection === 'elements',
        },
        {
          icon: layers,
          onClick: () => handleSelectSection('layers'),
          title: 'Layers',
          isSelected: selectedSection === 'layers',
        },
        // {
        //   icon: folder,
        //   onClick: () => handleSelectSection('uploads'),
        //   title: 'Uploads',
        //   isSelected: selectedSection === 'uploads',
        // },
      ]}
    />
  );
};

export { Sidebar };
