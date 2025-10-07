import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar.jsx";
import Sidebar from "../../components/Sidebar/Sidebar.jsx";
import CategoryBar from "../../components/CategoryBar/CategoryBar.jsx";
import VideoList from "../../components/VideoList/VideoList.jsx";
import Loader from "../../components/Loader/Loader.jsx";
import { resetVideos } from "../../redux/videoSlice.js";
import {loadSearchVideos} from "../../redux/videoThunks.js";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function Search() {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const query = useQuery().get("q") || "";
    const [searchQuery, setSearchQuery] = useState(query);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { items: videos, loading, nextPageToken } = useSelector(
        (state) => state.videos
    );

    useEffect(() => {
        return () => {
            // Reset Redux videos when leaving Search
            dispatch(resetVideos());
        };
    }, [dispatch]);

    // 🔹 debounce search
    useEffect(() => {
        const handler = setTimeout(() => {
            navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
            dispatch(resetVideos());
            if (searchQuery.trim()) {
                dispatch(loadSearchVideos({ query: searchQuery }));
            }
        }, 500);
        return () => clearTimeout(handler);
    }, [searchQuery, navigate, dispatch]);

    // 🔹 infinite scroll
    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + window.scrollY >=
                document.body.offsetHeight - 200
            ) {
                if (!loading && nextPageToken) {
                    dispatch(loadSearchVideos({ query, pageToken: nextPageToken }));
                }
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [dispatch, loading, nextPageToken, query]);

    return (
        <div className="App bg-gray-50 min-h-screen">
            <Navbar
                onMenuClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
            />

            <div className="flex">
                <Sidebar
                    className="flex-shrink-0"
                    isCollapsed={isSidebarCollapsed}
                    setIsCollapsed={setIsSidebarCollapsed}
                />

                <main className="flex-1 min-w-0 mx-60">
                    <CategoryBar />
                    <h2 className="text-lg font-semibold mb-4 px-4">
                        Search results for: "{query}"
                    </h2>

                    <div className="flex flex-col gap-4 px-4 mr-2">
                        {videos.length > 0 ? (
                            videos.map((video) => (
                                <VideoList key={video.id} video={video} layout="full" />
                            ))
                        ) : loading ? (
                            <p className="text-center text-gray-500">Loading...</p>
                        ) : (
                            <p className="text-center text-gray-500">No videos found</p>
                        )}
                    </div>

                    {loading && <Loader />}
                </main>
            </div>
        </div>
    );
}

export default Search;
