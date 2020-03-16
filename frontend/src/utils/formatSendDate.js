export const formatSendTime = time => time.substr(11, 5);

export const formatSendDateAndTime = time => {
    const date = new Date(time);
    const now = new Date();
    if (now.valueOf() - date.valueOf() < 86400000) {
        return formatSendTime(time);
    }
    return time.substr(2, 8).replace(/-/g, "/");
};
