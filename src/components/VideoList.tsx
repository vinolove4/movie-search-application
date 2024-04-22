import React from "react"
import { VideoListProps } from "../types"
import {VideoCard} from "./VideoCard"

export const VideoList = React.memo(({videoList}: VideoListProps) => {
    return (
        <>
            <div className="video-list-wrapper">
                {videoList.map((movie)=> <VideoCard movieData={movie} key={movie.imdbID} />
                )}
            </div>
            <h3 className="no-video-message">
                {
                    !videoList.length ? "No Video available": ""
                }
            </h3>
        </>
    )
})
