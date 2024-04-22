import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { Pagination } from "../components/pagination";
import { SearchBar } from "../components/SearchBar"
import { VideoList } from "../components/VideoList"
import { DEBOUNCE_TIME } from "../constant";
import { DEFAULT_VIDEO_LIST } from "../constant/video-data";
import { useDebounce, useFetch } from "../hooks";
import { RootState } from "../store";
import {appendVideoList, setVideoList} from "../store/video";

const DEFAULT_PAGE_NUMBER = 1;
const DEFAULT_KEYWORD = "fast"

export const MoviePage = () => {
    const [keyWord, setKeyword] = useState(DEFAULT_KEYWORD);
    const [isLoading, setIsLoading] = useState(false)
    const {videoList} = useSelector((state: RootState)=> state.video)
    const [totalResult, setTotalResult] = useState(0);
    const [rowsPerPage, _] = useState(10);
    const [currentPageNumber, setCurrentPageNumber] = useState(DEFAULT_PAGE_NUMBER);

    const {debounce} = useDebounce();
    const {fetchApi} = useFetch();
    const dispatch = useDispatch();
    const isInfiniteScroll = useRef(false)

    useEffect(()=>{
        getVideoByKeyword(DEFAULT_KEYWORD, DEFAULT_PAGE_NUMBER)
    }, [])


    const onChangeKeyWordHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {target} = event;
        const value = target?.value;
        setKeyword(value);
        window.scroll({behavior: "smooth", top: 0, left: 0})
        debounce(()=>{
            console.log("time to make the backend call", value)
            setCurrentPageNumber(1);
            if(value){
                getVideoByKeyword(value ? value : DEFAULT_KEYWORD , 1)
            }else{
                dispatch(setVideoList(DEFAULT_VIDEO_LIST))
            }
        }, DEBOUNCE_TIME)
    }

    const getVideoByKeyword = async(keyword: string, page: number, isInfinite = false) => {
        if(isLoading) return
        setIsLoading(true)
        const result = await fetchApi(`s=${keyword}&page=${page}`);
        if(result.Search){
            if(isInfinite){
                dispatch(appendVideoList(result.Search))
            }else{
                dispatch(setVideoList(result.Search))
            }
            setTotalResult(result.totalResults)
        }else{
            dispatch(setVideoList([]))
            setTotalResult(0)
        }
        setIsLoading(false)
    }

    const onClickPagination = (currentPage: number) => {
        if(currentPageNumber === currentPage) return;
        setCurrentPageNumber(currentPage)
        window.scroll({behavior: "smooth", top: 0, left: 0})
        getVideoByKeyword(keyWord, currentPage, false)
    }

    // const scrollHandler = async() => {
    //     const { scrollTop, clientHeight, scrollHeight } =
    //     document.documentElement;

    //     if ( !isInfiniteScroll.current && 
    //         scrollTop + clientHeight >= scrollHeight - 20 &&
    //         currentPageNumber+1 <= (Math.ceil(totalResult / rowsPerPage))
    //         ) {
    //         isInfiniteScroll.current = true;
    //         console.log("calling backend service.......", currentPageNumber+1)
    //         await getVideoByKeyword(keyWord, currentPageNumber+1, true);
    //         setCurrentPageNumber(prevState=>prevState+1)
    //         isInfiniteScroll.current = false
    //     }
    // }
    
    // useEffect(()=>{
       
    //     window.addEventListener("scroll",scrollHandler )
    //     return ()=>{
    //         window.removeEventListener("scroll", scrollHandler)
    //     }

    // }, [totalResult, videoList, currentPageNumber])

    return(
        <div>
            <SearchBar 
                keyword={keyWord} 
                onChangeKeyword={onChangeKeyWordHandler}
                isLoading={isLoading}
            />
            <VideoList videoList={videoList} />
            <Pagination 
                rowsPerPage={rowsPerPage} 
                total={totalResult} 
                onClickPagination={onClickPagination}
                currentPage={currentPageNumber}
            />
        </div>
    )
}