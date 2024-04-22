import {screen } from '@testing-library/react';
import {VideoList} from '../components/VideoList';
import { renderWithProviders } from './utils';
import { act } from 'react-dom/test-utils';

describe("Test Video List Card", ()=>{

    test('should show no video available', async() => {

        await act(()=>{
          renderWithProviders(
            <VideoList 
                videoList={[]}
            />, 
                {preloadedState: {}}
         )
        })

        expect(screen.getByText("No Video available")).toBeInTheDocument()
       
    });
    
})
