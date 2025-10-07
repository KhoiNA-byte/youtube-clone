import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadPopularVideos } from "../../redux/videoThunks.js";
import VideoGrid from "../../components/VideoGrid/VideoGrid.jsx";
import Sidebar from "../../components/Sidebar/Sidebar.jsx";
import CategoryBar from "../../components/CategoryBar/CategoryBar.jsx";
import NavbarNavigate from "../../components/NavbarNavigate/NavbarNavigate.jsx";
import Loader from "../../components/Loader/Loader.jsx";

function Home() {
  const dispatch = useDispatch();
  const { items: videos, loading, nextPageToken, mode } = useSelector(
      (state) => state.videos
  );

  const [searchQuery, setSearchQuery] = useState("");
  const [isCollapsed, setIsCollapsed] = useState(true); // 🔹 Sidebar toggle state

  // 🔹 Fetch videos on first load
  useEffect(() => {
    if (videos.length === 0 || mode !== "popular") {
      dispatch(loadPopularVideos("", undefined));
    }
  }, [dispatch, videos.length, mode]);

  // 🔹 Infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      if (
          window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 200
      ) {
        if (!loading && nextPageToken) {
          dispatch(loadPopularVideos(nextPageToken));
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [dispatch, loading, nextPageToken]);

  return (
      <div className="App bg-gray-50 min-h-screen">
        <NavbarNavigate
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onMenuClick={() => setIsCollapsed((prev) => !prev)} // 🔹 Hook up toggle
        />
        <div className="flex">
          <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} /> {/* ✅ Pass props */}
          <main className="flex-1 min-w-0">
            <CategoryBar />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-4 mr-2">
              {videos.length > 0 ? (
                  videos.map((video) => <VideoGrid key={video.id} video={video} />)
              ) : (
                  <p className="col-span-full text-center text-gray-500">
                    Loading videos...
                  </p>
              )}
            </div>
            {loading && <Loader />}
          </main>
        </div>
      </div>
  );
}

export default Home;
