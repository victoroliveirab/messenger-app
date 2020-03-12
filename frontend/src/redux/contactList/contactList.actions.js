export const selectContact = contactName => ({
    type: "SELECT_CONTACT",
    payload: contactName
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
