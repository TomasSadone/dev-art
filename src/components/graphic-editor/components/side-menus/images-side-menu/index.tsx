import { ChangeEvent, useRef } from 'react';
import { AppButton } from '../../../../button';
import { useCanvasContext } from 'components/graphic-editor/canvas-context/useCanvasContext';
import { useAtom } from 'jotai';
import { handleSetSelectedItemTypeAtom } from 'components/graphic-editor/canvas-context/atoms/atoms';
import style from './style.module.sass';
import {
    attachImage,
    createImage,
} from 'components/graphic-editor/helpers/image-handlers';
import plusCircle from '../../../../../assets/plus-circle.svg';

export type Props = {
    logos?: string[];
};

export const ImagesSidemenu = ({ logos }: Props) => {
    const canvasInstanceRef = useCanvasContext();
    if (!canvasInstanceRef.current) return <></>;
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [, setSelectedItemType] = useAtom(handleSetSelectedItemTypeAtom);

    const handleButtonClick = () => {
        fileInputRef.current && fileInputRef.current.click();
    };
    const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        const file = e.target.files[0];
        if (file.size > 5000000) {
            return new Error(
                'It was not possibe to upload this image because it weights more than 5 MB'
            );
        }
        const reader = new FileReader();
        // Load the selected image file
        reader.onload = function (event) {
            if (typeof event?.target?.result !== 'string')
                throw new Error('An error occured loading the file');
            const imgObj = new Image();
            handleCreateImage(event.target.result);
            imgObj.src = event.target.result;
        };
        reader.readAsDataURL(file);
    };

    const handleCreateImage = async (src: string) => {
        if (!canvasInstanceRef.current) return;
        const image = await createImage(src, {
            height: canvasInstanceRef.current.getHeight(),
            width: canvasInstanceRef.current.getWidth(),
        });
        attachImage(image, canvasInstanceRef.current);
        setSelectedItemType('images');
    };

    return (
        <div className={style.container}>
            <div className={style.group}>
                <p>Upload an image</p>
                <AppButton
                    icon={plusCircle}
                    title='Add'
                    color='blue'
                    onClick={handleButtonClick}
                />
                <input
                    type='file'
                    onChange={handleUpload}
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                />
            </div>
        </div>
    );
};
