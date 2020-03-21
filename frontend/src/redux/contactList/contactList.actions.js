export const selectContact = contactName => ({
    type: "SELECT_CONTACT",
    payload: contactName
});

export const setContactObj = contact => ({
    type: "SET_CONTACT_OBJ",
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

export const reorderCurrentToFirst = () => ({
    type: "REORDER_CURRENT_TO_FIRST"
});
