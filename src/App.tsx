import './App.css';
import ErrorBoundary from './components/ErrorBoundary';
import { MoviePage } from './pages/MoviePage';

function App() {
  return (
    <ErrorBoundary>
      <MoviePage />
    </ErrorBoundary>
  );
}

export default App;
