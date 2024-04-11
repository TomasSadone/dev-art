import { GraphicEditorWithContext } from './components/graphic-editor/canvas-context/canvas-context';

function App() {
    return (
        <>
            <GraphicEditorWithContext
                onExit={() => null}
                onSave={(json) => {
                    const url = json.toDataURL({ format: 'jpg', quality: 0.8 });
                    const a = document.getElementById('download-button');
                    a?.setAttribute('href', url);
                    a?.click();
                }}
            />
            <a
                style={{ display: 'none' }}
                id='download-button'
                download={'canvas.png'}
            ></a>
        </>
    );
}

export default App;
