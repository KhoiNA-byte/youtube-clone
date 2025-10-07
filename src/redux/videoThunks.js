import {createAsyncThunk} from "@reduxjs/toolkit";
import {
    fetchChannelDetails, fetchChannelVideos, fetchPopularVideos, fetchSearchVideos, fetchChannelShorts,
    fetchChannelPlaylists
} from "../api/youtube.js";

// 🔹 Thunk for popular videos
export const loadPopularVideos = createAsyncThunk(
    "videos/loadPopular",
    async (pageToken = "") => {
        const data = await fetchPopularVideos(pageToken);
        return {mode: "popular", ...data};
    }
);

// 🔹 Thunk for search videos
export const loadSearchVideos = createAsyncThunk(
    "videos/loadSearch",
    async ({query, pageToken = ""}) => {
        const data = await fetchSearchVideos(query, pageToken);
        return {mode: "search", query, ...data};
    }
);

// 🔹 Load videos of a channel
export const loadChannelVideos = createAsyncThunk(
    "videos/loadChannel",
    async ({channelId, pageToken}, {rejectWithValue}) => {
        try {
            // Pass both channelId and pageToken to your API helper
            const data = await fetchChannelVideos(channelId, pageToken);
            return {mode: "channel", channelId, ...data};
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

const channelCache = new Map();
let lastRequestTime = 0;

export const loadChannelDetails = createAsyncThunk(
    "videos/loadChannelDetails",
    async (channelId, {rejectWithValue}) => {
        try {
            if (channelCache.has(channelId)) {
                console.log("[Cache hit] Channel details from cache:", channelId);
                return channelCache.get(channelId);
            }

            const now = Date.now();
            if (now - lastRequestTime < 1000) {
                console.warn("[Throttled] Skipping channel fetch (too soon)");
                return rejectWithValue("Too many requests - throttled");
            }
            lastRequestTime = now;

            const data = await fetchChannelDetails(channelId);

            channelCache.set(channelId, data);

            return data;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

export const loadChannelShorts = createAsyncThunk(
    "videos/loadChannelShorts",
    async ({ channelId, pageToken }, { rejectWithValue }) => {
        try {
            const data = await fetchChannelShorts(channelId, pageToken);
            return { mode: "shorts", channelId, ...data };
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

export const loadChannelPlaylists = createAsyncThunk(
    "videos/loadChannelPlaylists",
    async ({ channelId, pageToken }, { rejectWithValue }) => {
        try {
            const data = await fetchChannelPlaylists(channelId, pageToken);
            return { mode: "playlists", channelId, ...data };
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

