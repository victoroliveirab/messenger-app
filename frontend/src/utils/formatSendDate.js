export const formatSendTime = time => time.substr(11, 5);

export const formatSendDateAndTime = time => {
    const date = new Date(time);
    const now = new Date();
    if (now.valueOf() - date.valueOf() < 86400000) {
        return formatSendTime(time);
    }
    return time.substr(2, 8).replace(/-/g, "/");
};

export const timeElapsedFromNow = time => {
    const elapsed = Math.round(
        (new Date().getTime() - new Date(time).getTime()) / 1000
    );
    if (elapsed < 3600) {
        return `${Math.round(elapsed / 60)} minutes ago`;
    }
    return `${Math.round(elapsed / 3600)} hours ago`;
};
