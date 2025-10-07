import React from "react";
import VideoGrid from "../../../../components/VideoGrid/VideoGrid.jsx";

function ChannelShorts({ shorts, loading }) {
    return (
        <div className="p-6">
            {shorts && shorts.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                    {shorts.map((short) => (
                        <VideoGrid key={short.id} video={short} />
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-500">
                    {loading ? "Loading Shorts..." : "No Shorts found"}
                </p>
            )}
        </div>
    );
}

export default React.memo(ChannelShorts);
