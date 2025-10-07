import axios from "axios";
import { formatDuration, timeAgo } from "../utils/format.js";

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const BASE_URL = "https://www.googleapis.com/youtube/v3";

// ========== Helper Functions ==========

// 🔹 Fetch channel icons in batch
async function fetchChannelIcons(channelIds) {
    if (!channelIds.length) return {};

    const { data } = await axios.get(`${BASE_URL}/channels`, {
        params: {
            part: "snippet",
            id: channelIds.join(","), // batch request
            key: API_KEY,
        },
    });

    return data.items.reduce((acc, item) => {
        acc[item.id] = item.snippet.thumbnails.default.url;
        return acc;
    }, {});
}

// 🔹 Fetch video details (views, duration, etc.)
async function fetchVideoDetails(videoIds) {
    if (!videoIds.length) return {};

    const { data } = await axios.get(`${BASE_URL}/videos`, {
        params: {
            part: "contentDetails,statistics",
            id: videoIds.join(","),
            key: API_KEY,
        },
    });

    return data.items.reduce((acc, item) => {
        acc[item.id] = {
            duration: formatDuration(item.contentDetails.duration),
            views: item.statistics.viewCount,
        };
        return acc;
    }, {});
}

// 🔹 Map raw API -> usable object
function mapVideos(items, channelIcons = {}, details = {}) {
    return items.map((item) => {
        const id = typeof item.id === "string" ? item.id : item.id.videoId;

        return {
            id,
            title: item.snippet.title,
            channel: item.snippet.channelTitle,
            channelId: item.snippet.channelId, // 🔹 add this
            channelIcon: channelIcons[item.snippet.channelId] || "",
            views: details[id]?.views
                ? `${details[id].views} views`
                : item.statistics?.viewCount
                    ? `${item.statistics.viewCount} views`
                    : "N/A",
            uploadTime: timeAgo(item.snippet.publishedAt),
            duration: details[id]?.duration
                ? details[id].duration
                : item.contentDetails?.duration
                    ? formatDuration(item.contentDetails.duration)
                    : "N/A",
            thumbnail:
                item.snippet.thumbnails.maxres?.url ||
                item.snippet.thumbnails.high?.url ||
                item.snippet.thumbnails.medium?.url ||
                "",
            url: `https://www.youtube.com/embed/${id}`,
            description: item.snippet.description,
        };
    });
}


function mapChannel(item) {
    return {
        id: item.id,
        title: item.snippet.title,
        description: item.snippet.description,
        channelIcon: item.snippet.thumbnails.high?.url || "",
        banner:
            item.brandingSettings?.image?.bannerExternalUrlExtraHd ||
            item.brandingSettings?.image?.bannerExternalUrlHd ||
            item.brandingSettings?.image?.bannerExternalUrl ||
            item.brandingSettings?.image?.bannerExternalUrlTv ||
            item.brandingSettings?.image?.bannerExternalUrlMobile ||
            "",
        subscriberCount: item.statistics.subscriberCount,
        videoCount: item.statistics.videoCount,
    };
}



// ========== Public API Functions ==========

// 🔹 Fetch trending videos (10 at a time)
export async function fetchPopularVideos(pageToken = "") {
    const { data } = await axios.get(`${BASE_URL}/videos`, {
        params: {
            part: "snippet,statistics,contentDetails",
            chart: "mostPopular",
            regionCode: "VN",
            maxResults: 10,
            pageToken,
            key: API_KEY,
        },
    });

    // batch fetch channel icons
    const channelIds = data.items.map((item) => item.snippet.channelId);
    const channelIcons = await fetchChannelIcons(channelIds);

    return {
        items: mapVideos(data.items, channelIcons),
        nextPageToken: data.nextPageToken || "",
    };
}

// 🔹 Search videos
export async function fetchSearchVideos(query, pageToken = "", maxResults = 10) {
    const { data } = await axios.get(`${BASE_URL}/search`, {
        params: {
            part: "snippet",
            type: "video",
            maxResults,
            q: query,
            pageToken,
            key: API_KEY,
        },
    });

    const videoIds = data.items.map((item) => item.id.videoId);
    const channelIds = data.items.map((item) => item.snippet.channelId);

    const [details, channelIcons] = await Promise.all([
        fetchVideoDetails(videoIds),
        fetchChannelIcons(channelIds),
    ]);

    return {
        items: mapVideos(data.items, channelIcons, details),
        nextPageToken: data.nextPageToken || "",
    };
}



// 🔹 Fetch single video by ID
export async function fetchVideoById(videoId) {
    const { data } = await axios.get(`${BASE_URL}/videos`, {
        params: {
            part: "snippet,contentDetails,statistics",
            id: videoId,
            key: API_KEY,
        },
    });

    if (!data.items.length) return null;
    const item = data.items[0];

    const [details, channelIcons] = await Promise.all([
        fetchVideoDetails([item.id]),
        fetchChannelIcons([item.snippet.channelId]),
    ]);

    return mapVideos([item], channelIcons, details)[0];
}


export const fetchChannelVideos = async (channelId, pageToken = "") => {
    const { data } = await axios.get(`${BASE_URL}/search`, {
        params: {
            part: "snippet",
            channelId,
            maxResults: 20,
            order: "date",
            ...(pageToken && { pageToken }),
            key: API_KEY,
            type: "video",
        },
    });

    const validItems = data.items.filter((item) => item.id?.videoId);

    const videoIds = validItems.map((item) => item.id.videoId);
    const channelIds = validItems.map((item) => item.snippet.channelId);

    const [details, channelIcons] = await Promise.all([
        fetchVideoDetails(videoIds),
        fetchChannelIcons(channelIds),
    ]);

    return {
        items: mapVideos(validItems, channelIcons, details),
        nextPageToken: data.nextPageToken || "",
    };
};


export const fetchChannelDetails = async (channelId) => {
    const { data } = await axios.get(`${BASE_URL}/channels`, {
        params: {
            part: "snippet,brandingSettings,statistics",
            id: channelId,
            key: API_KEY,
        },
    });

    if (!data.items.length) return null;

    return mapChannel(data.items[0]);
};

// 🔹 Fetch channel Shorts (filter: videoType=shorts)
export const fetchChannelShorts = async (channelId, pageToken = "") => {
    const { data } = await axios.get(`${BASE_URL}/search`, {
        params: {
            part: "snippet",
            channelId,
            maxResults: 20,
            order: "date",
            type: "video",
            q: "#shorts",
            ...(pageToken && { pageToken }),
            key: API_KEY,
        },
    });

    const validItems = data.items.filter((item) => item.id?.videoId);
    const videoIds = validItems.map((item) => item.id.videoId);
    const channelIds = validItems.map((item) => item.snippet.channelId);

    const [details, channelIcons] = await Promise.all([
        fetchVideoDetails(videoIds),
        fetchChannelIcons(channelIds),
    ]);

    return {
        items: mapVideos(validItems, channelIcons, details),
        nextPageToken: data.nextPageToken || "",
    };
};

// 🔹 Fetch channel Playlists
export const fetchChannelPlaylists = async (channelId, pageToken = "") => {
    const { data } = await axios.get(`${BASE_URL}/playlists`, {
        params: {
            part: "snippet,contentDetails",
            channelId,
            maxResults: 20,
            ...(pageToken && { pageToken }),
            key: API_KEY,
        },
    });

    return {
        items: data.items.map((item) => ({
            id: item.id,
            title: item.snippet.title,
            description: item.snippet.description,
            thumbnail:
                item.snippet.thumbnails.high?.url ||
                item.snippet.thumbnails.medium?.url ||
                "",
            videoCount: item.contentDetails.itemCount,
        })),
        nextPageToken: data.nextPageToken || "",
    };
};



