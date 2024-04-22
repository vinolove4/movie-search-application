export type Timer = ReturnType<typeof setTimeout>;
export type FetchCallType = "POST" | "GET";
export type TFunction = (...arg: any)=> any;

export interface SearchBarProps {
    keyword: string;
    onChangeKeyword: TFunction;
    isLoading?: boolean;
}

export interface IMovieType {
    Poster: string;  
    Title: string; 
    Type: string;
    Year: string;
    imdbID: string;
}

export interface VideoListProps{ 
    videoList: IMovieType[]
}

export interface VideoCardProps {
    movieData: IMovieType;
}

export interface PaginationProps {
    total: number;
    rowsPerPage: number;
    onClickPagination?: TFunction;
    currentPage: number;
}