import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
    loadChannelDetails, loadChannelPlaylists, loadChannelShorts,
    loadChannelVideos,
} from "../../redux/videoThunks.js";
import Sidebar from "../../components/Sidebar/Sidebar.jsx";
import NavbarNavigate from "../../components/NavbarNavigate/NavbarNavigate.jsx";
import Loader from "../../components/Loader/Loader.jsx";
import ChannelDetail from "./components/ChannelDetail/ChannelDetail.jsx";
import ChannelVideos from "./components/ChannelVideos/ChannelVideos.jsx";

function Channel() {
    const { channelId } = useParams();
    const dispatch = useDispatch();

    const {
        items: videos,
        shorts,
        playlists,
        loading,
        nextPageToken,
        channelDetails,
        mode,
    } = useSelector((state) => state.videos);


    const [searchQuery, setSearchQuery] = useState("");
    const [activeTab] = useState("videos");
    const [isCollapsed, setIsCollapsed] = useState(true); // ✅ Sidebar toggle

    // 🔹 Initial load
    useEffect(() => {
        if (channelId) {
            dispatch(loadChannelDetails(channelId));
            dispatch(loadChannelVideos({ channelId }));
            dispatch(loadChannelShorts({ channelId }));
            dispatch(loadChannelPlaylists({ channelId }));
        }
    }, [dispatch, channelId]);

    // 🔹 Infinite scroll for channel videos
    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + window.scrollY >=
                document.body.offsetHeight - 200
            ) {
                if (!loading && mode === "channel") {
                    if (nextPageToken) {
                        dispatch(loadChannelVideos({ channelId, pageToken: nextPageToken }));
                    } else if (videos.length > 0) {
                        const lastDate = videos[videos.length - 1].uploadTimeRaw;
                        if (lastDate) {
                            console.log("Switching to older segment:", lastDate);
                            dispatch(
                                loadChannelVideos({
                                    channelId,
                                    publishedBefore: lastDate,
                                })
                            );
                        }
                    }
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [dispatch, loading, nextPageToken, channelId, mode, videos]);

    return (
        <div className=" App bg-gray-50 min-h-screen">
            {/* 🔹 Navbar + Sidebar Toggle Button */}
            <NavbarNavigate
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                onMenuClick={() => setIsCollapsed((prev) => !prev)}
            />

            <div className="flex">
                {/* ✅ Pass isCollapsed + setIsCollapsed */}
                <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

                <main className="mx-50 flex-1 min-w-0">
                    {/* 🔹 Channel Header */}
                    <ChannelDetail channelDetails={channelDetails} />

                    {/* 🔹 Channel Content */}
                    <div className="px-6 py-4">
                        {activeTab === "videos" && (
                            <ChannelVideos
                                videos={videos}
                                shorts={shorts}
                                playlists={playlists}
                                loading={loading}
                            />

                        )}

                        {activeTab === "about" && (
                            <div className="text-gray-700">
                                <h2 className="font-semibold mb-2">About</h2>
                                <p>
                                    {channelDetails?.description || "No description available"}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* 🔹 Loader for infinite scroll */}
                    {loading && <Loader />}
                </main>
            </div>
        </div>
    );
}

export default Channel;
