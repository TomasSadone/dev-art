import './App.css';
import { GraphicEditorWithContext } from './components/graphic-editor/canvas-context/canvas-context';

function App() {
  return (
    <>
      <GraphicEditorWithContext
        onExit={() => null}
        onSave={() => {}}
      />
    </>
  );
}

export default App;
