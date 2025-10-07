import { Link } from "react-router-dom";
import clsx from "clsx";

function VideoList({ video, layout = "full" }) {
    const isCompact = layout === "compact";

    return (
        <Link
            to={`/detail/${video.id}`}
            className={clsx(
                "group flex cursor-pointer rounded-xl transition-all duration-200",
                isCompact ? "gap-3 p-2 hover:bg-gray-100" : "gap-4"
            )}
        >
            {/* Thumbnail */}
            <div
                className={clsx(
                    "relative flex-shrink-0 overflow-hidden rounded-xl",
                    isCompact ? "w-40 h-24 sm:w-32 sm:h-20" : "w-72"
                )}
            >
                <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                {video.duration && (
                    <span
                        className={clsx(
                            "absolute bottom-1 right-1 bg-black bg-opacity-80 text-white px-1.5 py-0.5 rounded",
                            isCompact ? "text-[10px]" : "text-xs bottom-2 right-2"
                        )}
                    >
            {video.duration}
          </span>
                )}
            </div>

            {/* Info */}
            <div
                className={clsx(
                    "flex flex-col justify-start",
                    isCompact ? "flex-1" : "flex-1"
                )}
            >
                {/* Title */}
                <h3
                    className={clsx(
                        "font-semibold line-clamp-2",
                        isCompact ? "text-sm" : "text-lg text-black"
                    )}
                >
                    {video.title}
                </h3>

                {/* Channel Row */}
                <div
                    className={clsx(
                        "flex items-center gap-2 mt-1",
                        isCompact ? "" : "mt-2"
                    )}
                >
                    {video.channelIcon && (
                        <img
                            src={video.channelIcon}
                            alt={video.channel}
                            className={clsx(
                                "rounded-full",
                                isCompact ? "w-6 h-6" : "w-9 h-9 mr-1"
                            )}
                        />
                    )}
                    <p
                        className={clsx(
                            "text-gray-500",
                            isCompact ? "text-xs" : "text-sm text-black"
                        )}
                    >
                        {video.channel}
                    </p>
                </div>

                {/* Views & time */}
                <p
                    className={clsx(
                        "text-gray-500",
                        isCompact ? "text-xs" : "text-sm mt-1"
                    )}
                >
                    {video.views} • {video.uploadTime}
                </p>

                {/* Description only for full */}
                {!isCompact && video.description && (
                    <p className="text-sm text-black mt-2 line-clamp-2">
                        {video.description}
                    </p>
                )}
            </div>
        </Link>
    );
}

export default VideoList;
