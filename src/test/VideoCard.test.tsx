import React from 'react';
import { fireEvent, screen, within } from '@testing-library/react';
import {VideoCard} from '../components/VideoCard';
import { renderWithProviders } from './utils';
import { MOCKED_DETAILS_RESPONSE, MOCK_MOVIE_DATA } from './constant/mockData';
import { act } from 'react-dom/test-utils';

jest.mock("../components/Modal.tsx", ()=>{
  return{
    Modal: (props: any)=>{
      return(
        <div>
          <button onClick={props.onClose} data-testid="close-model-icon">
            Click Me
          </button>
          {
            props.children
          }
        </div>
      )
    }
  }
})

describe("Test Video Card", ()=>{

    test('renders learn react link', async() => {
       // @ts-ignore
        global.fetch = jest.fn(() => Promise.resolve({ json: () => MOCKED_DETAILS_RESPONSE}))

        await act(()=>{
          renderWithProviders(<VideoCard movieData={MOCK_MOVIE_DATA} />, {preloadedState: {}})
        })
        const card = screen.getByTestId("video-card");
        expect(card).toBeInTheDocument();
        expect(within(card).getByText(MOCK_MOVIE_DATA.Title)).toBeInTheDocument();
        act(()=>{
          fireEvent.click(card);
        })
        fireEvent.click(screen.getByTestId("close-model-icon"))
        fireEvent.click(screen.getByTestId("video-card"));
    });
    
})
