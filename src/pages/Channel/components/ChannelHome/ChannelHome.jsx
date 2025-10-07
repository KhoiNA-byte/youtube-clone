import React, {useRef, useState, useEffect} from "react";
import {ChevronLeft, ChevronRight} from "lucide-react";
import VideoGrid from "../../../../components/VideoGrid/VideoGrid.jsx";

function useButtonScrollHandler() {
    const ref = useRef(null);
    const [index, setIndex] = useState(0);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    const updateButtons = () => {
        const el = ref.current;
        if (!el) return;
        const totalItems = el.children.length;
        const visibleItems = Math.floor(el.clientWidth / el.children[0]?.clientWidth);
        setCanScrollLeft(index > 0);
        setCanScrollRight(index + visibleItems < totalItems);
    };

    const scroll = (dir) => {
        const el = ref.current;
        if (!el) return;
        const itemWidth = el.children[0]?.clientWidth || 0;
        const step = Math.floor(el.clientWidth / itemWidth);
        const newIndex = dir === "left" ? Math.max(index - step, 0) : index + step;
        setIndex(newIndex);
        el.scrollTo({
            left: newIndex * itemWidth,
            behavior: "smooth",
        });
    };

    useEffect(() => {
        updateButtons();
        window.addEventListener("resize", updateButtons);
        return () => window.removeEventListener("resize", updateButtons);
    }, [index]);

    return {ref, canScrollLeft, canScrollRight, scroll};
}

function ChannelHome({videos = [], shorts = [], playlists = [], loading}) {
    const featuredScroll = useButtonScrollHandler();
    const shortsScroll = useButtonScrollHandler();
    const playlistsScroll = useButtonScrollHandler();

    const featuredVideo = videos[0];

    return (
        <div className="p-6 space-y-10">
            {featuredVideo && (
                <div className=" flex flex-col md:flex-row gap-6 items-start">
                    <div className="w-full md:w-2/8 aspect-video rounded-xl overflow-hidden shadow-sm">
                        <iframe
                            src={`https://www.youtube.com/embed/${featuredVideo.id}?autoplay=1&mute=1`}
                            title={featuredVideo.title}
                            allow="autoplay; encrypted-media"
                            allowFullScreen
                            className="w-full h-full"
                        ></iframe>
                    </div>

                    {/* 🎥 Featured Section */}
                    <div className="md:w-2/5 flex flex-col justify-between space-y-3">
                        <h2 className="text-lg md:text-xl font-semibold line-clamp-2">
                            {featuredVideo.title}
                        </h2>
                        <p className="text-sm text-gray-500">
                            {featuredVideo.channel} • {featuredVideo.views} •{" "}
                            {featuredVideo.uploadTime}
                        </p>
                        <p className="text-sm text-gray-700 line-clamp-5">
                            {featuredVideo.description || "No description available."}
                        </p>
                    </div>
                </div>
            )}

            {/* 🔹 Featured Videos */}
            <div className="relative">
                <h2 className="text-xl font-semibold mb-4">Featured Videos</h2>

                {featuredScroll.canScrollLeft && (
                    <button
                        onClick={() => featuredScroll.scroll("left")}
                        className="absolute left-0 top-1/2 -translate-y-1/2
                        bg-gradient-to-r from-white via-white/80 to-transparent p-2 rounded-full shadow-md z-10"
                    >
                        <ChevronLeft/>
                    </button>
                )}

                <div
                    ref={featuredScroll.ref}
                    className="flex overflow-hidden space-x-4"
                >
                    {videos.length > 1 ? (
                        videos.slice(1, 9).map((video) => (
                            <div key={video.id} className="flex-shrink-0 w-72">
                                <VideoGrid video={video}/>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">
                            {loading ? "Loading..." : "No featured videos"}
                        </p>
                    )}
                </div>

                {featuredScroll.canScrollRight && (
                    <button
                        onClick={() => featuredScroll.scroll("right")}
                        className="absolute right-0 top-1/2 -translate-y-1/2
                        bg-gradient-to-l from-white via-white/80 to-transparent p-2 rounded-full shadow-md z-10"
                    >
                        <ChevronRight/>
                    </button>
                )}
            </div>

            {/* 🔹 Shorts Section */}
            {shorts?.length > 0 && (
                <div className="relative">
                    <h2 className="text-xl font-semibold mb-4">Shorts</h2>

                    {shortsScroll.canScrollLeft && (
                        <button
                            onClick={() => shortsScroll.scroll("left")}
                            className="absolute left-0 top-1/2 -translate-y-1/2
                            bg-gradient-to-r from-white via-white/80 to-transparent p-2 rounded-full shadow-md z-10"
                        >
                            <ChevronLeft/>
                        </button>
                    )}

                    <div
                        ref={shortsScroll.ref}
                        className="flex overflow-hidden space-x-4"
                    >
                        {shorts.map((short) => (
                            <div key={short.id} className="flex-shrink-0 w-40">
                                <img
                                    src={short.thumbnail}
                                    alt={short.title}
                                    className="w-full h-72 rounded-lg object-cover"
                                />
                            </div>
                        ))}
                    </div>

                    {shortsScroll.canScrollRight && (
                        <button
                            onClick={() => shortsScroll.scroll("right")}
                            className="absolute right-0 top-1/2 -translate-y-1/2
                            bg-gradient-to-l from-white via-white/80 to-transparent p-2 rounded-full shadow-md z-10"
                        >
                            <ChevronRight/>
                        </button>
                    )}
                </div>
            )}

            {/* 🔹 Playlists Section */}
            {playlists?.length > 0 && (
                <div className="relative">
                    <h2 className="text-xl font-semibold mb-4">Playlists</h2>

                    {playlistsScroll.canScrollLeft && (
                        <button
                            onClick={() => playlistsScroll.scroll("left")}
                            className="absolute left-0 top-1/2 -translate-y-1/2
                            bg-gradient-to-r from-white via-white/80 to-transparent p-2 rounded-full shadow-md z-10"
                        >
                            <ChevronLeft/>
                        </button>
                    )}

                    <div
                        ref={playlistsScroll.ref}
                        className="flex overflow-hidden space-x-4"
                    >
                        {playlists.slice(0, 8).map((playlist) => (
                            <div key={playlist.id} className="flex-shrink-0 w-72 cursor-pointer">
                                <div className="relative">
                                    <img
                                        src={playlist.thumbnail}
                                        alt={playlist.title}
                                        className="rounded-lg w-full h-44 object-cover"
                                    />
                                    <span
                                        className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                                        {playlist.videoCount} videos
                                    </span>
                                </div>
                                <p className="font-medium mt-2 truncate">{playlist.title}</p>
                                <p className="text-sm text-gray-500">
                                    {playlist.channelTitle}
                                </p>
                            </div>
                        ))}
                    </div>

                    {playlistsScroll.canScrollRight && (
                        <button
                            onClick={() => playlistsScroll.scroll("right")}
                            className="absolute right-0 top-1/2 -translate-y-1/2
                            bg-gradient-to-l from-white via-white/80 to-transparent p-2 rounded-full shadow-md z-10"
                        >
                            <ChevronRight/>
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}

export default ChannelHome;
