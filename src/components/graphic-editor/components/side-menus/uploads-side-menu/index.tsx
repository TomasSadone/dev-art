import {
  handleSetSelectedItemTypeAtom,
  templateUploadsAtom,
} from '../../../canvas-context/atoms/atoms';
import { useCanvasContext } from '../../../canvas-context/useCanvasContext';
import { attachImage, createImage } from '../../../helpers/image-handlers';
import style from '../images-side-menu/style.module.sass';
import { useAtom } from 'jotai';
import { ImageUploadsSM } from './image-uploads-sm';

export type OwnUpload = {
  _id: string;
  owner: string;
  url: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type Props = {
  onOwnUploadDelete?: (image: OwnUpload) => void;
  myUploads?: OwnUpload[];
};

export const UploadsSidemenu = ({ onOwnUploadDelete, myUploads }: Props) => {
  const canvasInstanceRef = useCanvasContext();

  const [templateUploads, setTemplateUploads] = useAtom(templateUploadsAtom);
  const [, setSelectedItemType] = useAtom(handleSetSelectedItemTypeAtom);

  const handleCreateImage = async (src: string) => {
    if (!canvasInstanceRef.current) return;
    const image = await createImage(src, {
      height: canvasInstanceRef.current.getHeight(),
      width: canvasInstanceRef.current.getWidth(),
    });
    attachImage(image, canvasInstanceRef.current);
    setSelectedItemType('images');
  };

  const handleTemplateUploadDelete = (i: number) => {
    if (templateUploads) {
      const newTemplateUploads = [...templateUploads];
      newTemplateUploads.splice(i, 1);
      setTemplateUploads(newTemplateUploads);
    }
  };

  return (
    <div className={style.container}>
      {templateUploads && (
        <div className={style.group}>
          <p>Utilizzati in questo template</p>

          {templateUploads.map((image, i) => (
            <ImageUploadsSM
              key={image}
              index={i}
              onClick={handleCreateImage}
              onDelete={handleTemplateUploadDelete}
              src={image}
            />
          ))}
        </div>
      )}
      {myUploads && (
        <div className={style.group}>
          <p>Caricamenti precedenti</p>
          {myUploads.map((image, i) => (
            <ImageUploadsSM
              key={image._id}
              index={i}
              onClick={handleCreateImage}
              onDelete={() => {
                onOwnUploadDelete && onOwnUploadDelete(image);
              }}
              src={image.url}
            />
          ))}
        </div>
      )}
    </div>
  );
};
