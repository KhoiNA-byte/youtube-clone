import {useState,} from "react";
import {youtube} from "../../assets/index.js";
import {useSelector, useDispatch} from "react-redux";
import {toggle} from "../../redux/buttonSlice.js";
import {
    Menu,
    Search,
    Mic,
    Plus,
    Bell,
    User,
    ArrowLeft,
} from "lucide-react";
import {Link, useNavigate} from "react-router-dom";


function NavbarNavigate({onMenuClick, searchQuery, setSearchQuery}) {
    const [showMobileSearch, setShowMobileSearch] = useState(false);
    const navigate = useNavigate();

    const clicked = useSelector((state) => state.button.value);
    const dispatch = useDispatch();

    const handleSearch = () => {
        if (searchQuery.trim() !== "") {
            navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
        }
    };

    return (
        <header className="flex justify-between items-center px-3 py-3 bg-white sticky top-0 z-20">
            {/* Mobile search overlay */}
            {showMobileSearch ? (
                <div className="flex sm:hidden items-center w-full max-w-xs mx-auto">
                    <button
                        className="p-2 mr-2 bg-gray-100 rounded-full hover:bg-gray-300"
                        onClick={() => setShowMobileSearch(false)}
                    >
                        <ArrowLeft size={20}/>
                    </button>
                    <input
                        type="text"
                        placeholder="Search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSearch()} // 🔹 Press Enter
                        className="w-full px-4 py-2 border border-gray-300 rounded-l-full focus:outline-none"
                    />
                </div>
            ) : (
                <>
                    {/* Left section */}
                    <div className="flex items-center space-x-2 flex-shrink-0">
                        <button
                            className="p-2 hover:bg-gray-200 rounded-full"
                            onClick={onMenuClick}
                        >
                            <Menu size={24}/>
                        </button>

                        <Link to="/">
                            <div className="flex items-center cursor-pointer">
                                <img
                                    src={youtube}
                                    alt="YouTube Logo"
                                    className="h-6 sm:h-7"
                                />
                                <span className="text-lg font-semibold ml-1 sm:block">
                                    YouTube
                                </span>
                            </div>
                        </Link>
                    </div>

                    {/* Middle section - Search */}
                    <div className="flex items-center justify-end sm:justify-center flex-grow mx-2 min-w-0">
                        {/* Desktop search input and button */}
                        <div className="hidden sm:flex items-center w-full max-w-2xl">
                            <input
                                type="text"
                                placeholder="Search"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-l-full focus:outline-none"
                            />
                            <button
                                onClick={handleSearch}
                                className="px-4 py-2 bg-gray-100 border border-l-0 border-gray-300 rounded-r-full hover:bg-gray-300"
                            >
                                <Search size={20}/>
                            </button>
                        </div>

                        {/* Mobile: show search and mic */}
                        <Link to="/Search">
                            <button
                                className="sm:hidden p-2 bg-gray-100 rounded-full hover:bg-gray-300 ml-2"
                                onClick={() => setShowMobileSearch(true)}
                            >
                                <Search size={20}/>
                            </button>
                        </Link>
                        <button className="p-2 ml-2 bg-gray-100 rounded-full hover:bg-gray-300 hidden sm:flex">
                            <Mic size={20}/>
                        </button>
                    </div>

                    {/* Right section */}
                    <div className="flex items-center space-x-2 flex-shrink-0">
                        {/* Toggle button */}
                        <button
                            onClick={() => dispatch(toggle())}
                            className="ml-2 px-3 py-1 bg-blue-500 text-white rounded-full hover:bg-blue-600"
                        >
                            {clicked ? "Already clicked" : "Not clicked"}
                        </button>
                        <button className="flex items-center p-2 bg-gray-100 rounded-full hover:bg-gray-300">
                            <Plus size={20}/>
                            <span className="ml-1.5 text-sm font-medium sm:block">Create</span>
                        </button>
                        <button className="p-2 hover:bg-gray-200 rounded-full hidden sm:flex">
                            <Bell size={22}/>
                        </button>
                        <button className="p-1">
                            <div className="w-7 h-7 bg-gray-300 rounded-full flex items-center justify-center">
                                <User size={18} className="text-gray-700"/>
                            </div>
                        </button>
                    </div>
                </>
            )}
        </header>
    )
        ;
}

export default NavbarNavigate;
