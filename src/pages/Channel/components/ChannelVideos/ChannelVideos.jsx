import { useState } from "react";
import VideoGrid from "../../../../components/VideoGrid/VideoGrid.jsx";
import CategoryBar from "../../../../components/CategoryBar/CategoryBar.jsx";
import ChannelShorts from "../ChannelShorts/ChannelShorts.jsx";
import ChannelPlaylists from "../ChannelPlaylists/ChannelPlaylists.jsx";
import ChannelHome from "../ChannelHome/ChannelHome.jsx";

function ChannelVideos({ videos, shorts = [], playlists = [], loading }) {
    const [activeTab, setActiveTab] = useState("home");
    const tabs = ["home", "videos", "shorts", "playlists"];

    const renderContent = () => {
        switch (activeTab) {
            case "home":
                return (
                    <ChannelHome
                        videos={videos}
                        playlists={playlists}
                        shorts={shorts}
                        loading={loading}
                    />
                );

            case "videos":
                return (
                    <div className="p-6">
                        <CategoryBar />
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                            {videos.length > 0 ? (
                                videos.map((video) => (
                                    <VideoGrid key={video.id} video={video} />
                                ))
                            ) : (
                                <p className="col-span-full text-center text-gray-500">
                                    {loading ? "Loading videos..." : "No videos found"}
                                </p>
                            )}
                        </div>
                    </div>
                );

            case "shorts":
                return (
                    <div className="p-6">
                        <CategoryBar />
                        <ChannelShorts shorts={shorts} loading={loading} />
                    </div>
                );

            case "playlists":
                return (
                    <div className="p-6">
                        <CategoryBar />
                        <ChannelPlaylists playlists={playlists} loading={loading} />
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div>
            {/* 🔹 Sticky Tabs */}
            <div
                className="sticky top-0 z-30 bg-white border-b flex gap-6 text-sm font-medium px-6 py-3
                           backdrop-blur supports-[backdrop-filter]:bg-white/80"
            >
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`pb-2 capitalize transition-colors ${
                            activeTab === tab
                                ? "border-b-2 border-black text-black"
                                : "text-gray-500 hover:text-black"
                        }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {renderContent()}
        </div>
    );
}

export default ChannelVideos;
