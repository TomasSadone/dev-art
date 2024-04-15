import React, { useState } from 'react';
import { fonts } from '../../../constants/fonts';
import style from './style.module.sass';
import { useCanvasContext } from '../../../canvas-context/useCanvasContext';
import { fabric } from 'fabric';
import { AppButton } from '../../../../button';
import { handleSetSelectedItemTypeAtom } from '../../../canvas-context/atoms/atoms';
import { useAtom } from 'jotai';
import { v4 as uuid } from 'uuid';
import plusCircle from '../../../../../assets/plus-circle.svg';
import searchIcon from '../../../../../assets/search-magnifier-lens.svg';

export const TextSidemenu = () => {
    const [search, setSearch] = useState('');
    const [, setSelectedItemType] = useAtom(handleSetSelectedItemTypeAtom);
    const handleSearch = (e: React.FormEvent<HTMLInputElement>) => {
        setSearch(e.currentTarget.value);
    };
    const fontsToDisplay = fonts.filter((font) =>
        font.toLowerCase().includes(search.toLowerCase())
    );

    const canvasInstanceRef = useCanvasContext();

    const handleAddText = (fontFamily: (typeof fonts)[number]) => {
        if (!canvasInstanceRef.current)
            throw new Error('canvas.current is not defined');
        const newText = new fabric.IText('Click to modify', {
            text: 'Click to modify',
            left: 50,
            top: 100,
            fontFamily,
            fontSize: 30,
            fill: '#000',
            opacity: 1.0,
            fontStyle: 'normal',
            name: uuid(), //the name set to an uuid it's what makes the layers work
        });
        canvasInstanceRef.current.add(newText);
        canvasInstanceRef.current.setActiveObject(newText);

        setSelectedItemType('text');
    };

    return (
        <div className={style.sidemenu}>
            <form className={style.form}>
                <img
                    src={searchIcon}
                    alt=''
                />
                <input
                    placeholder='Search a font type'
                    value={search}
                    type='text'
                    onChange={handleSearch}
                />
            </form>
            <AppButton
                title='Add a text'
                color='blue'
                icon={plusCircle}
                onClick={() => handleAddText('Poppins')}
            />
            <p className={style.title}>Or pick a font type</p>
            <ul className={style.fonts}>
                {fontsToDisplay.map((font) => (
                    <li
                        className={style[font.split(' ').join('')]}
                        key={font}
                    >
                        <button onClick={() => handleAddText(font)}>
                            {font}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};
