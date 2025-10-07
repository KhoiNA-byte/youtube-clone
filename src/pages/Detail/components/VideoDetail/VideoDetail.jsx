import React, { useEffect, useState } from "react";
import { ThumbsUp, ThumbsDown, Share2, Download, Bookmark } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { loadPopularVideos } from "../../../../redux/videoThunks.js";
import { Link } from "react-router-dom";


function VideoDetail({ video }) {
  const [showMore, setShowMore] = useState(false);
  const dispatch = useDispatch();

  const clicked = useSelector((state) => state.button.value);
  const {
    items: videos,
    loading,
    nextPageToken,
    mode,
  } = useSelector((state) => state.videos);

  // 🔹 First load
  useEffect(() => {
    if (videos.length === 0 || mode !== "popular") {
      dispatch(loadPopularVideos(""));
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

  if (!video) return <p className="p-4">Video not found</p>;

  return (
      <div className="w-full">
        {/* Video player */}
        <div className="w-full aspect-video rounded-lg overflow-hidden">
          <iframe
              className="w-full h-full rounded-lg"
              src={`${video.url}?autoplay=1&mute=1`}
              title={video.title}
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
          />
        </div>

        {/* Title */}
        <h1 className="text-xl font-bold mt-3">{video.title}</h1>

        {/* Views & Upload Date */}
        <p className="text-gray-600 text-sm mt-1">
          {video.views} • {video.uploadTime}
        </p>

        {/* Channel Info + Buttons */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-4 pb-4 gap-3">
          {/* Channel Info */}
          <div className="flex items-center gap-3">
            <Link
                to={`/channel/${video.channelId}`}
                className="flex items-center gap-3 hover:underline"
            >
              <img
                  src={video.channelIcon}
                  alt={video.channel}
                  className="w-12 h-12 rounded-full"
              />
              <div>
                <h2 className="font-semibold">{video.channel}</h2>
                <p className="text-sm text-gray-500">1M subscribers</p>
              </div>
            </Link>

            <button className="bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800">
              {clicked ? "Unsubscribed" : "Subscribed"}
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 overflow-x-auto sm:overflow-visible">
            <button className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full hover:bg-gray-200 shrink-0">
              <ThumbsUp size={18} />
              <span>167K</span>
            </button>
            <button className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full hover:bg-gray-200 shrink-0">
              <ThumbsDown size={18} />
            </button>
            <button className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full hover:bg-gray-200 shrink-0">
              <Share2 size={18} />
              <span>Share</span>
            </button>
            <button className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full hover:bg-gray-200 shrink-0">
              <Download size={18} />
              <span>Download</span>
            </button>
            <button className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full hover:bg-gray-200 shrink-0">
              <Bookmark size={18} />
              <span>Save</span>
            </button>
          </div>
        </div>

        {/* Description */}
        <div className="mt-4 bg-gray-100 p-4 rounded-lg">
          <p className="text-sm text-gray-800 whitespace-pre-line">
            {showMore
                ? video.description
                : video.description.slice(0, 200) +
                (video.description.length > 200 ? "..." : "")}
          </p>
          {video.description.length > 200 && (
              <button
                  onClick={() => setShowMore(!showMore)}
                  className="text-black font-medium mt-2 cursor-pointer"
              >
                {showMore ? "Show less" : "Show more"}
              </button>
          )}
        </div>
      </div>
  );
}

export default VideoDetail;
