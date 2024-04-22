import { PaginationProps } from "../types"

export const Pagination = ({rowsPerPage, total, onClickPagination, currentPage}: PaginationProps) => {
    const list = Array.from({
        length: (Math.ceil(total / rowsPerPage))
    }).map((_, index)=> index+1)

    return(
        <div className="pagination-wrapper">
            {
               list.map((pageNumber, index)=>{
                    return(
                        <div 
                            key={index} 
                            className={`page-box ${currentPage == pageNumber ? "selected-page-box": ""} `}
                            onClick={()=>onClickPagination?.(pageNumber)}
                            data-testid="page-box"
                        >
                            {pageNumber}
                        </div>
                    )
                })
            }
        </div>
    )
}