import React, { useState } from "react";
import {
    Home,
    PlaySquare,
    MonitorPlay,
    User,
    Download,
    History,
    ListVideo,
    Video,
    Clock,
    ThumbsUp,
    ChevronRight,
    ChevronDown,
    ChevronUp,
    Music,
    Gamepad2,
    Newspaper,
    Trophy,
    Settings,
    Flag,
    HelpCircle,
    MessageSquare
} from "lucide-react";
import {
    Thebausffs,
    Danehearth,
    Los_Ratones,
    PewDiePie,
    SolarLight,
    Mark_Rober
} from "../../assets/index.js";

function Sidebar({ isCollapsed, setIsCollapsed }) {
    const [showAll, setShowAll] = useState(false);

    // Collapsed mode items
    const collapsedItems = [
        { icon: <Home size={22} />, text: "Home" },
        { icon: <PlaySquare size={22} />, text: "Shorts" },
        { icon: <MonitorPlay size={22} />, text: "Subscriptions" },
        { icon: <User size={22} />, text: "You" },
        { icon: <Download size={22} />, text: "Downloads" },
    ];

    // Expanded mode sections
    const topItems = [
        { icon: <Home size={22} />, text: "Home" },
        { icon: <PlaySquare size={22} />, text: "Shorts" },
        { icon: <MonitorPlay size={22} />, text: "Subscriptions" },
    ];

    const youItems = [
        { icon: <History size={22} />, text: "History" },
        { icon: <ListVideo size={22} />, text: "Playlists" },
        { icon: <Video size={22} />, text: "Your videos" },
        { icon: <Clock size={22} />, text: "Watch later" },
        { icon: <ThumbsUp size={22} />, text: "Liked videos" },
        { icon: <Download size={22} />, text: "Downloads" },
    ];

    const subscriptions = [
        { icon: <img src={Thebausffs} alt="Thebausffs" className="w-6 h-6 rounded-full" />, text: "Thebausffs" },
        { icon: <img src={Danehearth} alt="Danehearth" className="w-6 h-6 rounded-full" />, text: "Danehearth" },
        { icon: <img src={Los_Ratones} alt="Los Ratones" className="w-6 h-6 rounded-full" />, text: "Los Ratones" },
        { icon: <img src={PewDiePie} alt="PewDiePie" className="w-6 h-6 rounded-full" />, text: "PewDiePie" },
        { icon: <img src={SolarLight} alt="SolarLight" className="w-6 h-6 rounded-full" />, text: "SolarLight" },
        { icon: <img src={Mark_Rober} alt="Mark Rober" className="w-6 h-6 rounded-full" />, text: "Mark Rober" },
    ];
    const visibleSubs = showAll ? subscriptions : subscriptions.slice(0, 4);

    return (
        <>
            {/* Overlay background for mobile view*/}
            {!isCollapsed && (
                <div
                    className="fixed inset-0 bg-black/20 z-10 lg:hidden"
                    onClick={() => setIsCollapsed(true)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
          bg-white h-screen sticky top-10 z-10 transition-all duration-300
          ${isCollapsed ? "w-20" : "w-58 left-0"}
          lg:flex lg:flex-col lg:sticky lg:top-0 lg:z-0
        `}
            >
                <div className="h-full overflow-y-auto py-4">
                    {isCollapsed ? (
                        // Collapsed layout
                        collapsedItems.map((item, index) => (
                            <div
                                key={index}
                                className="flex flex-col items-center py-4 text-xs cursor-pointer hover:bg-gray-100 rounded-lg"
                            >
                                <span className="text-black">{item.icon}</span>
                                <span className="mt-1">{item.text}</span>
                            </div>
                        ))
                    ) : (
                        <>
                            {/* Top group */}
                            {topItems.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex items-center py-3 px-6 text-sm cursor-pointer hover:bg-gray-100 rounded-lg"
                                >
                                    <span className="text-black">{item.icon}</span>
                                    <span className="ml-4">{item.text}</span>
                                </div>
                            ))}

                            <hr className="my-3 border-t border-gray-300" />

                            {/* You items */}
                            <div className="flex items-center justify-between py-2 px-4 text-sm font-semibold text-black cursor-pointer hover:bg-gray-100 rounded-lg">
                                <span className="ml-4">You</span>
                                <ChevronRight size={18} className="text-gray-500" />
                            </div>

                            {youItems.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex items-center py-3 px-6 text-sm cursor-pointer hover:bg-gray-100 rounded-lg"
                                >
                                    <span className="text-black">{item.icon}</span>
                                    <span className="ml-4">{item.text}</span>
                                </div>
                            ))}

                            <hr className="my-3 border-t border-gray-300" />

                            {/* Subscriptions items */}
                            <div className="flex items-center justify-between py-2 px-4 text-sm font-semibold text-black cursor-pointer hover:bg-gray-100 rounded-lg">
                                <span className="ml-4">Subscriptions</span>
                                <ChevronRight size={18} className="text-gray-500" />
                            </div>

                            {visibleSubs.map((sub, index) => (
                                <div
                                    key={index}
                                    className="flex items-center py-2 px-4 rounded-lg hover:bg-gray-100 cursor-pointer"
                                >
                                    <span className="mr-4">{sub.icon}</span>
                                    <span className="truncate">{sub.text}</span>
                                </div>
                            ))}

                            {/* Show more / less */}
                            <div
                                onClick={() => setShowAll(!showAll)}
                                className="flex items-center gap-2 py-2 px-6 text-sm text-black cursor-pointer hover:bg-gray-100 rounded-lg"
                            >
                                {showAll ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                                <span>{showAll ? "Show less" : "Show more"}</span>
                            </div>

                            <hr className="my-3 border-t border-gray-300" />

                            {/* Explore */}
                            <div className="px-4 text-sm font-semibold text-black mb-1">Explore</div>
                            <div className="flex items-center py-2 px-6 text-sm cursor-pointer hover:bg-gray-100 rounded-lg">
                                <span className="text-black"><Music size={20} /></span>
                                <span className="ml-4">Music</span>
                            </div>
                            <div className="flex items-center py-2 px-6 text-sm cursor-pointer hover:bg-gray-100 rounded-lg">
                                <span className="text-black"><Gamepad2 size={20} /></span>
                                <span className="ml-4">Gaming</span>
                            </div>
                            <div className="flex items-center py-2 px-6 text-sm cursor-pointer hover:bg-gray-100 rounded-lg">
                                <span className="text-black"><Newspaper size={20} /></span>
                                <span className="ml-4">News</span>
                            </div>
                            <div className="flex items-center py-2 px-6 text-sm cursor-pointer hover:bg-gray-100 rounded-lg">
                                <span className="text-black"><Trophy size={20} /></span>
                                <span className="ml-4">Sports</span>
                            </div>

                            <hr className="my-3 border-t border-gray-300" />

                            {/* More from YouTube */}
                            <div className="px-4 text-sm font-semibold text-black mb-1">More from YouTube</div>
                            <div className="flex items-center py-2 px-6 text-sm cursor-pointer hover:bg-gray-100 rounded-lg">YouTube Premium</div>
                            <div className="flex items-center py-2 px-6 text-sm cursor-pointer hover:bg-gray-100 rounded-lg">YouTube Studio</div>
                            <div className="flex items-center py-2 px-6 text-sm cursor-pointer hover:bg-gray-100 rounded-lg">YouTube Music</div>
                            <div className="flex items-center py-2 px-6 text-sm cursor-pointer hover:bg-gray-100 rounded-lg">YouTube Kids</div>

                            <hr className="my-3 border-t border-gray-300" />

                            {/* Settings */}
                            <div className="flex items-center py-2 px-6 text-sm cursor-pointer hover:bg-gray-100 rounded-lg">
                                <span className="text-black"><Settings size={20} /></span>
                                <span className="ml-4">Settings</span>
                            </div>
                            <div className="flex items-center py-2 px-6 text-sm cursor-pointer hover:bg-gray-100 rounded-lg">
                                <span className="text-black"><Flag size={20} /></span>
                                <span className="ml-4">Report history</span>
                            </div>
                            <div className="flex items-center py-2 px-6 text-sm cursor-pointer hover:bg-gray-100 rounded-lg">
                                <span className="text-black"><HelpCircle size={20} /></span>
                                <span className="ml-4">Help</span>
                            </div>
                            <div className="flex items-center py-2 px-6 text-sm cursor-pointer hover:bg-gray-100 rounded-lg">
                                <span className="text-black"><MessageSquare size={20} /></span>
                                <span className="ml-4">Send feedback</span>
                            </div>
                        </>
                    )}
                </div>
            </aside>
        </>
    );
}

export default React.memo(Sidebar);
