// redux/videosSlice.js
import { createSlice } from "@reduxjs/toolkit";
import {
    loadChannelDetails, loadChannelPlaylists, loadChannelShorts,
    loadChannelVideos,
    loadPopularVideos,
    loadSearchVideos,
} from "./videoThunks.js";

const videosSlice = createSlice({
    name: "videos",
    initialState: {
        mode: "popular",
        query: "",
        items: [],
        nextPageToken: "",
        loading: false,
        error: null,
        channelDetails: null,
        shorts: [],
        playlists: [],
    },

    reducers: {
        resetVideos(state) {
            state.items = [];
            state.nextPageToken = "";
            state.loading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // 🔹 Popular videos
            .addCase(loadPopularVideos.pending, (state) => {
                state.loading = true;
            })
            .addCase(loadPopularVideos.fulfilled, (state, action) => {
                state.loading = false;
                state.mode = "popular";

                if (!action.meta.arg) {
                    // first page
                    state.items = action.payload.items;
                } else {
                    state.items.push(...action.payload.items);
                }

                state.nextPageToken = action.payload.nextPageToken || "";
            })
            .addCase(loadPopularVideos.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // 🔹 Search videos
            .addCase(loadSearchVideos.pending, (state) => {
                state.loading = true;
            })
            .addCase(loadSearchVideos.fulfilled, (state, action) => {
                state.loading = false;
                state.mode = "search";
                state.query = action.payload.query;

                if (!action.meta.arg.pageToken) {
                    state.items = action.payload.items;
                } else {
                    state.items.push(...action.payload.items);
                }

                state.nextPageToken = action.payload.nextPageToken || "";
            })
            .addCase(loadSearchVideos.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // 🔹 Channel videos (fixed for infinite scroll)
            .addCase(loadChannelVideos.pending, (state) => {
                state.loading = true;
            })
            .addCase(loadChannelVideos.fulfilled, (state, action) => {
                state.loading = false;
                state.mode = "channel";

                if (!action.meta.arg.pageToken) {
                    // first load
                    state.items = action.payload.items;
                } else {
                    // append next pages
                    state.items.push(...action.payload.items);
                }

                state.nextPageToken = action.payload.nextPageToken || "";
            })
            .addCase(loadChannelVideos.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // 🔹 Channel details
            .addCase(loadChannelDetails.fulfilled, (state, action) => {
                state.channelDetails = action.payload;
            })
            .addCase(loadChannelDetails.rejected, (state, action) => {
                state.error = action.error.message;
            })
            // 🔹 Channel Shorts
            .addCase(loadChannelShorts.pending, (state) => {
                state.loading = true;
            })
            .addCase(loadChannelShorts.fulfilled, (state, action) => {
                state.loading = false;
                state.shorts = action.payload.items;
                state.nextPageToken = action.payload.nextPageToken || "";
            })
            .addCase(loadChannelShorts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // 🔹 Channel Playlists
            .addCase(loadChannelPlaylists.pending, (state) => {
                state.loading = true;
            })
            .addCase(loadChannelPlaylists.fulfilled, (state, action) => {
                state.loading = false;
                state.playlists = action.payload.items;
                state.nextPageToken = action.payload.nextPageToken || "";
            })
            .addCase(loadChannelPlaylists.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
        ;
    },
});

export const { resetVideos } = videosSlice.actions;
export default videosSlice.reducer;
