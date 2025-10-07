import { Link } from "react-router-dom";
import React from "react";

function VideoGrid({ video }) {
    return (
        <Link to={`/detail/${video.id}`} className="block cursor-pointer">
            <div className="relative">
                <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-auto rounded-xl"
                />
                <span
                    className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-1 py-0.5 rounded"
                >
                    {video.duration}
                </span>
            </div>

            <div className="flex mt-3">
                {/* Channel Icon */}
                <div className="flex-shrink-0 mr-3">
                    {video.channelIcon ? (
                        <img
                            src={video.channelIcon}
                            alt={video.channel}
                            className="w-9 h-9 rounded-full"
                        />
                    ) : (
                        <div className="w-9 h-9 bg-gray-300 rounded-full"></div>
                    )}
                </div>

                {/* Video Info */}
                <div>
                    <h3 className="font-medium text-gray-900 line-clamp-2">
                        {video.title}
                    </h3>
                    <p className="text-sm text-gray-500 flex items-center">
                        {video.channel}
                    </p>
                    <p className="text-sm text-gray-500">
                        {video.views} • {video.uploadTime}
                    </p>
                </div>
            </div>
        </Link>
    );
}

export default React.memo(VideoGrid);
