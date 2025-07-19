import { HandwritingTutorView } from './view/HandwritingTutorView';
import { ThemeProvider } from './hooks/useTheme';

function App() {
  return (
    <ThemeProvider defaultTheme='system' storageKey='writing-coach-theme'>
      <HandwritingTutorView />
    </ThemeProvider>
  );
}

export default App;
