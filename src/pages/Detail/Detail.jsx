import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavbarNavigate from "../../components/NavbarNavigate/NavbarNavigate.jsx";
import VideoDetail from "./components/VideoDetail/VideoDetail.jsx";
import Sidebar from "../../components/Sidebar/Sidebar.jsx";
import { fetchVideoById } from "../../api/youtube.js";
import Loader from "../../components/Loader/Loader.jsx";
import RelatedVideos from "./components/RelatedVideos/RelatedVideos.jsx";
import { useSelector } from "react-redux";

function Detail() {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const { id } = useParams();
    const [video, setVideo] = useState(null);
    const { items: videos } = useSelector((state) => state.videos);

    useEffect(() => {
        if (id) {
            fetchVideoById(id).then(setVideo).catch(console.error);
        }
    }, [id]);

    return (
        <div className="App bg-gray-50 min-h-screen">
            {/* Navbar */}
            <NavbarNavigate
                onMenuClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
            />

            <div className="flex relative">
                {/* Sidebar as overlay */}
                {!isSidebarCollapsed && (
                    <div className="absolute top-0 left-0 h-full z-50">
                        <Sidebar
                            className="w-64 bg-white shadow-lg"
                            isCollapsed={isSidebarCollapsed}
                            setIsCollapsed={setIsSidebarCollapsed}
                        />
                    </div>
                )}

                {/* Main Content */}
                <main className="flex-1 min-w-0 mx-20 px-4 lg:px-12 py-4 flex flex-col lg:flex-row gap-6">
                    {/* Video Area */}
                    <div className="w-full lg:w-3/4">
                        {!video ? (
                            <div className="flex justify-center items-center h-96">
                                <Loader />
                            </div>
                        ) : (
                            <VideoDetail video={video} />
                        )}
                    </div>

                    {/* Related Videos */}
                    <div className="w-full lg:w-1/4">
                        <RelatedVideos videos={videos} currentVideoId={video?.id} />
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Detail;
