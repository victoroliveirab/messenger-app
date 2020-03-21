export const sortObjectsByTimeValue = (arr, key) => {
    const copy = [...arr];
    copy.sort(
        (a, b) =>
            new Date(b.lastMessage[key]).getTime() -
            new Date(a.lastMessage[key]).getTime()
    );
    return copy;
};

export const sortObjectsByStringValue = (arr, key) => {
    const copy = [...arr].sort((a, b) => a[key].localeCompare(b[key]));
    return copy;
};
