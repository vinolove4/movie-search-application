import { DEFAULT_VIDEO_LIST } from './../constant/video-data';
import {createSlice} from "@reduxjs/toolkit";

interface VideoStoreInitialState {
    videoList: any[];
}

const initialState: VideoStoreInitialState = {
    videoList: [],
}

const VideoStore = createSlice({
    name: "video",
    initialState,
    reducers: {
        setVideoList: (state, action) => {
            const {payload} = action
            state.videoList = payload
        },
        appendVideoList: (state, action)=>{
            const {payload} = action;
            state.videoList = [...state.videoList, ...payload]
        }
    }
})

export const {setVideoList, appendVideoList} = VideoStore.actions;
export default VideoStore.reducer