import { fireEvent, screen, within } from '@testing-library/react';
import {MoviePage} from '../pages/MoviePage';
import { renderWithProviders } from './utils';
import { MOCKED_MOVIE_LIST } from './constant/mockData';
import { act } from 'react-dom/test-utils';

describe("Test Movie Page", ()=>{

    test('Should Render movie page', async() => {
       // @ts-ignore
        global.fetch = jest.fn(() => Promise.resolve({ json: () => MOCKED_MOVIE_LIST}))
        jest.useFakeTimers()
        jest.spyOn(global, "setTimeout");
        await act(()=>{
          renderWithProviders(<MoviePage />, {preloadedState: {
            video: {
                videoList: [],
            }
          }})
        })

        await act(()=>{
          fireEvent.change(screen.getByTestId("search-bar-input"), {target: {value: "movie"}})
          jest.runAllTimers();
        })

        global.scroll = jest.fn()
        // fireEvent.click(screen.getAllByTestId("page-box")[0], {})
        // fireEvent.click(screen.getAllByTestId("page-box")[1], {})

        await act(()=> {
          fireEvent.change(screen.getByTestId("search-bar-input"), {target: {value: ""}})
          jest.runAllTimers()
        })
        
    });

    test('Should render error response', async() => {
      // @ts-ignore
      global.fetch = jest.fn(() => Promise.resolve({ json: () => ({
         Error: "Movie not found!",
         Response: "False"
       })}))
       jest.useFakeTimers()
       jest.spyOn(global, "setTimeout");
       await act(()=>{
         renderWithProviders(<MoviePage />, {preloadedState: {
           video: {
               videoList: [],
           }
         }})
       })

       await act(()=>{
        fireEvent.change(screen.getByTestId("search-bar-input"), {target: {value: "fast"}})
        jest.runAllTimers();
       })
   });
   
    
})
