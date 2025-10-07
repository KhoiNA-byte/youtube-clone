import React, { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
    mockCategories,
    mockSearchCategories,
    mockChannelCategories,
} from "../../data/index.js";
import { useLocation } from "react-router-dom";

function CategoryBar() {
    const scrollRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    const location = useLocation();
    const path = location.pathname;

    // Determine which mock data to use
    let currentCategories = mockCategories;
    if (path.startsWith("/search")) {
        currentCategories = mockSearchCategories;
    } else if (path.startsWith("/channel/")) {
        currentCategories = mockChannelCategories;
    }

    const checkForScroll = () => {
        const el = scrollRef.current;
        if (!el) return;
        const { scrollLeft, scrollWidth, clientWidth } = el;
        setCanScrollLeft(scrollLeft > 1);
        setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth - 1);
    };

    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;
        checkForScroll();

        el.addEventListener("scroll", checkForScroll, { passive: true });
        window.addEventListener("resize", checkForScroll);

        return () => {
            el.removeEventListener("scroll", checkForScroll);
            window.removeEventListener("resize", checkForScroll);
        };
    }, []);

    const scroll = (direction) => {
        const el = scrollRef.current;
        if (!el) return;
        const amount = el.clientWidth * 0.6;
        el.scrollBy({
            left: direction === "left" ? -amount : amount,
            behavior: "smooth",
        });
    };

    return (
        <div className="relative bg-white sticky top-[56px] z-10 flex items-center w-full">
            {canScrollLeft && (
                <button
                    onClick={() => scroll("left")}
                    className="absolute left-0 z-30 h-full w-10 flex items-center justify-center
                     bg-gradient-to-r from-white via-white/80 to-transparent pb-2"
                >
                    <ChevronLeft size={20} />
                </button>
            )}

            <div
                ref={scrollRef}
                className="flex space-x-3 whitespace-nowrap px-4 py-2 mb-3 overflow-hidden scroll-smooth min-w-0 scrollbar-hide"
            >
                {currentCategories.map((category, idx) => (
                    <button
                        key={idx}
                        className="px-4 py-1 rounded-xl bg-gray-100 hover:bg-gray-200 text-base font-bold"
                    >
                        {category}
                    </button>
                ))}
            </div>

            {canScrollRight && (
                <button
                    onClick={() => scroll("right")}
                    className="absolute right-0 z-30 h-full w-10 flex items-center justify-center
                     bg-gradient-to-l from-white via-white/80 to-transparent pb-2"
                >
                    <ChevronRight size={20} />
                </button>
            )}
        </div>
    );
}

export default React.memo(CategoryBar);
