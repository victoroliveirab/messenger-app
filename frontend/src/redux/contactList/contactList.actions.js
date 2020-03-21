export const selectContact = contactName => ({
    type: "SELECT_CONTACT",
    payload: contactName
});

export const setContactObj = contact => ({
    type: "SET_CONTACT_OBJ",
    payload: contact
});

export const getContactList = () => ({
    type: "GET_CONTACT_LIST"
});

export const setContactList = contacts => ({
    type: "SET_CONTACT_LIST",
    payload: contacts
});

export const unsetLoading = () => ({
    type: "UNSET_LOADING"
});

export const changeOrder = () => ({
    type: "CHANGE_ORDER"
});
