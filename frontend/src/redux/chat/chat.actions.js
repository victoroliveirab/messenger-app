export const setMessages = messages => ({
    type: "SET_MESSAGES",
    payload: messages
});

export const appendMessage = message => ({
    type: "APPEND_MESSAGE",
    payload: message
});
