import {screen } from '@testing-library/react';
import {SearchBar} from '../components/SearchBar';
import { renderWithProviders } from './utils';
import { act } from 'react-dom/test-utils';

describe("Test Search Card", ()=>{

    test('should render search card', async() => {

        await act(()=>{
          renderWithProviders(
            <SearchBar 
                isLoading={true} 
                keyword={"hello"} 
                onChangeKeyword={jest.fn()} 
                />, 
                {preloadedState: {}}
         )
        })

        expect(screen.getByTestId("search-bar-loader")).toBeInTheDocument()
       
    });
    
})
