import { ReactNode, useState } from "react";
import {useFetch} from "../hooks";
import {VideoDetailsCard} from "./VideoDetailsCard"
import { VideoCardProps } from "../types";
import { Modal } from "./Modal";

export const VideoCard = ({movieData}: VideoCardProps) => {
    const {Title, Poster, Year, imdbID} = movieData
    const [isHighlighted, setIsHighLighted] = useState(false);
    const {fetchApi} = useFetch();
    const [videoDetails, setVideoDetails] = useState(undefined);
    const [isLoading, setIsLoading] = useState(false)

    const onClickHandler = async() => {
        setIsHighLighted(true)
        if(!videoDetails){
            setIsLoading(true)
            const result = await fetchApi(`i=${imdbID}`);
            setVideoDetails(result)
            setIsLoading(false)
        }
    }

    const closeModalHandler = () => {
        setIsHighLighted(false)
    }

    return(
        <>
            <div 
                className={`video-card`}
                onClick={onClickHandler} 
                data-testid="video-card"
            >
                <img src={Poster} alt="poster" />
                <div className="movie-title">
                    {Title}
                </div>
                <div>
                    {Year}
                </div>
            </div>
            {
                isHighlighted && 
                <Modal
                    isOpen={isHighlighted} 
                    onClose={closeModalHandler} 
                >
                    <VideoDetailsCard  details={videoDetails} />
                    {
                        isLoading
                        &&
                        <img src="loader.svg" className="loader-icon" />
                    }  
                </Modal>
            }
        </>
    )
}