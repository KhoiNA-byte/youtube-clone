import React from "react";

function ChannelPlaylists({ playlists, loading }) {
    return (
        <div className="p-6">
            {loading && <p className="text-gray-500">Loading playlists...</p>}

            {!loading && (!playlists || playlists.length === 0) ? (
                <p className="text-gray-500 text-center">No playlists found</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-4">
                    {playlists.map((playlist) => (
                        <div
                            key={playlist.id}
                            className="cursor-pointer bg-gray-50 hover:bg-gray-100 rounded-xl overflow-hidden transition"
                        >
                            {/* Thumbnail with overlay */}
                            <div className="relative">
                                <img
                                    src={playlist.thumbnail}
                                    alt={playlist.title}
                                    className="w-full h-48 object-cover"
                                />

                                {/* 🔹 Video count overlay */}
                                <span className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                                    {playlist.videoCount} videos
                                </span>
                            </div>

                            {/* Playlist Info */}
                            <div className="p-3">
                                <p className="font-medium line-clamp-2">{playlist.title}</p>
                                <p className="text-sm text-gray-500 truncate">
                                    {playlist.channelTitle}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ChannelPlaylists;
