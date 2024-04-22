import {fireEvent, screen } from '@testing-library/react';
import {Modal} from '../components/Modal';
import { renderWithProviders } from './utils';
import { act } from 'react-dom/test-utils';
import React from 'react';

describe("Test Modal Card", ()=>{

    test('should render Modal', async() => {
        jest
        .spyOn(React, 'useRef')
        .mockReturnValueOnce({
          current: {
            showModal: jest.fn(),
            close: jest.fn()
          }
       });

        await act(()=>{
          renderWithProviders(
            <Modal 
                isOpen={true}
                onClose={jest.fn()}
            >
                Hello Data
            </Modal>, 
            {preloadedState: {}}
         )
        })

        expect(screen.getByText("Hello Data")).toBeInTheDocument();
        fireEvent.keyDown(screen.getByTestId("custom-modal"), {
            key: "Escape"
        })
        fireEvent.keyDown(screen.getByTestId("custom-modal"), {
            key: "Alt"
        })
    });
    
})
