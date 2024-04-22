import { render, screen } from '@testing-library/react'; 
import ErrorBoundary from '../components/ErrorBoundary'; 
import '@testing-library/jest-dom'; 

describe('Error Boundary', () => {

  test('should render Error Boundary', () => {
    const ThrowError = () => {
      throw new Error('Test');
    };

    render(
        <ErrorBoundary>
            <ThrowError />
        </ErrorBoundary>
    );
    expect(screen.getByText('Sorry.. there was an error')).toBeInTheDocument();
  });

});