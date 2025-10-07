import VideoList from "../../../../components/VideoList/VideoList.jsx";
import CategoryBar from "../../../../components/CategoryBar/CategoryBar.jsx";

function RelatedVideos({ videos, currentVideoId }) {
    return (
        <aside className="w-full flex flex-col gap-4 mt-6 lg:mt-0 lg:sticky lg:top-20 h-fit">
            {/* Category filter bar */}
            <CategoryBar />

            {/* Related videos list */}
            <div className="flex flex-col gap-3">
                {videos
                    .filter((v) => v.id !== currentVideoId)
                    .map((v) => (
                        <VideoList key={v.id} video={v} layout="compact" />
                    ))}
            </div>
        </aside>
    );
}

export default RelatedVideos;
