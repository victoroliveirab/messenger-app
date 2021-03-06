export const setContact = contactName => ({
    type: "SET_CONTACT",
    payload: contactName
});

export const setContactRef = contact => ({
    type: "SET_CONTACT_REF",
    payload: contact
});

export const setContactList = contacts => ({
    type: "SET_CONTACT_LIST",
    payload: contacts
});

export const appendToContactList = contact => ({
    type: "APPEND_TO_CONTACT_LIST",
    payload: contact
});

export const setChatList = contacts => ({
    type: "SET_CHAT_LIST",
    payload: contacts
});

export const appendToChatList = contact => ({
    type: "APPEND_TO_CHAT_LIST",
    payload: contact
});

export const unsetLoading = () => ({
    type: "UNSET_LOADING"
});

export const changeOrder = () => ({
    type: "CHANGE_ORDER"
});

export const reorderCurrentToFirst = newLastMessage => ({
    type: "REORDER_CURRENT_TO_FIRST",
    payload: newLastMessage
});
