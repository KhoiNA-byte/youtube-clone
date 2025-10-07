import { useState } from "react";

function ChannelDetail({ channelDetails }) {
    const [showMore, setShowMore] = useState(false);

    return (
        <div>
            {/* Banner */}
            {channelDetails?.banner && (
                <div className="w-full h-60 bg-gray-200">
                    <img
                        src={channelDetails.banner}
                        alt="Channel banner"
                        className="w-full h-full object-cover"
                    />
                </div>
            )}

            {/* Header */}
            <div className="flex items-center gap-4 p-4">
                <img
                    src={channelDetails?.channelIcon}
                    alt={channelDetails?.title}
                    className="w-20 h-20 rounded-full"
                />
                <div>
                    <h1 className="text-2xl font-bold">{channelDetails?.title}</h1>
                    <p className="text-gray-600">
                        {channelDetails?.subscriberCount} subscribers •{" "}
                        {channelDetails?.videoCount} videos
                    </p>

                    {/* Description */}
                    <p className="text-sm text-gray-500 mt-2 whitespace-pre-line">
                        {showMore
                            ? channelDetails?.description
                            : (channelDetails?.description || "").slice(0, 20) +
                            ((channelDetails?.description?.length || 0) > 20 ? "..." : "")}

                        {channelDetails?.description?.length > 20 && (
                            <button
                                onClick={() => setShowMore(!showMore)}
                                className="ml-1 text-blue-600 text-sm font-medium cursor-pointer"
                            >
                                {showMore ? "Show less" : "Show more"}
                            </button>
                        )}
                    </p>
                </div>
            </div>
        </div>
    );
}


export default ChannelDetail;
