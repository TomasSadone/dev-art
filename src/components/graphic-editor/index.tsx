import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import { fabric } from 'fabric';
import 'fabric-history';
import { useAtom } from 'jotai';
import { Editor } from '../base-editor';
import { Canvas } from './components/canvas';
import { ActionsBar, SaveObject } from './components/actions-bar';
import { Sidebar } from './components/sidebar';
import { Toolbar } from './components/toolbars';
import { useCanvasContext } from './canvas-context/useCanvasContext';
import { Sidemenu } from './components/side-menus';
import { elementSectionTypes } from './constants/element-section-types';
import { ExposedMehtods, Resizer } from './components/resizer';
import {
    ToolbarsSections,
    handleSetSelectedItemTypeAtom,
    handleSetSelectedSectionAtom,
    handleSetTemplateUploadsAtom,
    handleSetThreePointsMenuPosition,
} from './canvas-context/atoms/atoms';
import { OwnUpload } from './components/side-menus/uploads-side-menu';

fabric.Object.prototype.transparentCorners = false;
fabric.Object.prototype.cornerColor = '#00b27a';
fabric.Object.prototype.cornerStyle = 'circle';
fabric.Object.NUM_FRACTION_DIGITS = 8;

export type Props = {
    onSave: (template: SaveObject) => void;
    onExit: () => void;
    onOwnUploadDelete?: (image: OwnUpload) => void;
    logos?: string[];
    myUploads?: OwnUpload[];
};

export const GraphicEditor = forwardRef(
    ({ onSave, onExit, logos, myUploads, onOwnUploadDelete }: Props, ref) => {
        const canvasInstanceRef = useCanvasContext();
        const [, setSelectedSection] = useAtom(handleSetSelectedSectionAtom);
        const [, setSelectedItemType] = useAtom(handleSetSelectedItemTypeAtom);
        const setSectionAndItemType = (
            section: Exclude<ToolbarsSections, 'canvas'>
        ) => {
            setSelectedSection(section);
            setSelectedItemType(section);
        };
        const [, setPositionThreePointsMenu] = useAtom(
            handleSetThreePointsMenuPosition
        );
        const [, setTemplateUploads] = useAtom(handleSetTemplateUploadsAtom);
        const resizerRef = useRef<ExposedMehtods | null>(null);

        useImperativeHandle(ref, () => {
            return {
                loadFromJSON(loadedCanvas: SaveObject) {
                    if (!canvasInstanceRef.current)
                        throw Error(
                            'You must wait for canvas to be initalized'
                        );

                    const { current: canvas } = canvasInstanceRef;

                    canvas.loadFromJSON(loadedCanvas, () => {
                        canvasInstanceRef!.current!.renderAll.bind(canvas);
                        canvas.setWidth(loadedCanvas.width);
                        canvas.setHeight(loadedCanvas.height);
                        resizerRef.current?.setInitialSize({
                            height: loadedCanvas.height,
                            width: loadedCanvas.width,
                        });
                        const templateUploads = loadedCanvas.objects.reduce<
                            string[]
                        >((arr, obj) => {
                            if (
                                'type' in obj &&
                                'src' in obj &&
                                typeof obj.src === 'string'
                            ) {
                                if (obj.type === 'image') {
                                    arr.push(obj.src);
                                }
                            }
                            return arr;
                        }, []);
                        setTemplateUploads(templateUploads);
                    });
                },
                isCanvasInitialized() {
                    return !!canvasInstanceRef.current;
                },
            };
        });

        useEffect(() => {
            if (canvasInstanceRef.current) {
                canvasInstanceRef.current.on('mouse:down', handleMouseDown);
                canvasInstanceRef.current.on(
                    'selection:cleared',
                    handleSectionCleared
                );
                canvasInstanceRef.current.on(
                    'selection:created',
                    handleSelection
                );
                canvasInstanceRef.current.on(
                    'selection:updated',
                    handleSelection
                );
                canvasInstanceRef.current.on(
                    'object:modified',
                    handleSelection
                );
                return () => {
                    canvasInstanceRef.current?.dispose();
                };
            }
        }, []);

        useEffect(() => {
            window.addEventListener('keydown', handleKeyDown);
            return () => window.removeEventListener('keydown', handleKeyDown);
        }, []);

        function handleMouseDown(e: fabric.IEvent<Event>) {
            if (!e.target || !e.target?.type) {
                setSelectedSection('');
                setSelectedItemType('canvas');
                return;
            }
            const { type } = e.target;
            if (type === 'i-text') {
                setSectionAndItemType('text');
            } else if (elementSectionTypes.includes(type)) {
                setSectionAndItemType('elements');
            } else if (type === 'image') {
                setSectionAndItemType('images');
            }
        }

        function handleSectionCleared() {
            setPositionThreePointsMenu(null);
            setSelectedItemType('');
        }

        function handleSelection() {
            setPositionThreePointsMenu(null);
        }

        function handleKeyDown(e: KeyboardEvent) {
            if (!canvasInstanceRef.current) return;
            if (
                (e.ctrlKey && e.key === 'z' && e.altKey) ||
                (e.ctrlKey && e.key === 'y')
            ) {
                // Ctrl+Z+Alt or Ctrl+Y  for redo
                e.preventDefault();
                (
                    canvasInstanceRef.current as {
                        redo: Function;
                    } & fabric.Canvas
                ).redo();
            } else if (
                e.ctrlKey &&
                e.key === 'z' &&
                (canvasInstanceRef.current as any).historyUndo.length > 0
            ) {
                // Ctrl+Z for undo
                e.preventDefault();
                (
                    canvasInstanceRef.current as {
                        undo: Function;
                    } & fabric.Canvas
                ).undo();
            } else if (e.key === 'Backspace' || e.key === 'Delete') {
                // Backspace or Delete for delete
                const activeObject =
                    canvasInstanceRef.current.getActiveObject();
                if (activeObject) {
                    console.log(activeObject);
                    e.preventDefault();
                    canvasInstanceRef.current.remove(activeObject);
                }
            }
        }

        return (
            <Editor
                ActionsBarChildren={
                    <ActionsBar
                        onExit={onExit}
                        onSave={onSave}
                    />
                }
                Sidebar={<Sidebar />}
                SidemenuChildren={
                    <Sidemenu
                        onOwnUploadDelete={onOwnUploadDelete}
                        logos={logos}
                        myUploads={myUploads}
                    />
                }
                ToolsBarChildren={<Toolbar />}
            >
                <div style={{ height: '100%' }}>
                    <Canvas />
                    <Resizer ref={resizerRef} />
                </div>
            </Editor>
        );
    }
);
