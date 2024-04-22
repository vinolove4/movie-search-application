import { SearchBarProps } from '../types';

export const SearchBar = ({keyword, onChangeKeyword, isLoading}: SearchBarProps) => {
  return (
    <>
        <div className='search-bar-wrapper'>
            <div className='serach-bar-content'>
                <div>
                    Prime Video
                </div>
                <div className='search-input-wrapper'>
                    <img src='search.svg' />
                    <input 
                        onChange={onChangeKeyword} 
                        className="search-input-bar" 
                        placeholder='search'
                        value={keyword}
                        data-testid={"search-bar-input"}
                    />
                    {
                        isLoading
                        &&
                        <div className='search-loader' data-testid="search-bar-loader">
                            <img src="loader.svg" className="loader-icon" />
                        </div>
                    }
                    
                </div>
            </div>
        </div>
        
    </>
  )
}
