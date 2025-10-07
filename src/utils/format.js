export function timeAgo(dateString) {
    const date = new Date(dateString);
    const seconds = Math.floor((Date.now() - date) / 1000);

    const intervals = [
        {label: "year", seconds: 31536000},
        {label: "month", seconds: 2592000},
        {label: "week", seconds: 604800},
        {label: "day", seconds: 86400},
        {label: "hour", seconds: 3600},
        {label: "minute", seconds: 60},
    ];

    for (const i of intervals) {
        const count = Math.floor(seconds / i.seconds);
        if (count >= 1) {
            return `${count} ${i.label}${count > 1 ? "s" : ""} ago`;
        }
    }
    return "just now";
}

export function formatDuration(isoDuration) {
    const match = isoDuration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);

    const hours = match[1] ? parseInt(match[1]) : 0;
    const minutes = match[2] ? parseInt(match[2]) : 0;
    const seconds = match[3] ? parseInt(match[3]) : 0;

    const h = hours > 0 ? `${hours}:` : "";
    const m = (hours > 0 ? String(minutes).padStart(2, "0") : minutes) || "0";
    const s = String(seconds).padStart(2, "0");

    return `${h}${m}:${s}`;
}
