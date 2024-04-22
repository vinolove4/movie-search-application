import {fireEvent, screen } from '@testing-library/react';
import {Pagination} from '../components/pagination';
import { renderWithProviders } from './utils';
import { act } from 'react-dom/test-utils';

describe("Test Search Card", ()=>{

    test('should render search card', async() => {

        await act(()=>{
          renderWithProviders(
            <Pagination 
                currentPage={1}
                rowsPerPage={10}
                total={50}
                onClickPagination={jest.fn()}
                />, 
                {preloadedState: {}}
         )
        })

        const allPagination = screen.getAllByTestId("page-box")
        expect(allPagination.length).toBe(5)
        fireEvent.click(allPagination[2])
    });
    
})
