const INITIAL_STATE = {
    contactSelected: null,
    contactSelectedRef: null,
    contacts: [],
    chats: [],
    loading: true
};

const contactList = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "SET_CONTACT":
            return {
                ...state,
                contactSelected: action.payload
            };
        case "SET_CONTACT_REF":
            return {
                ...state,
                contactSelectedRef: action.payload
            };
        case "SET_CONTACT_LIST":
            return {
                ...state,
                contacts: action.payload
            };
        case "APPEND_TO_CONTACT_LIST":
            const newContactList = state.contacts.concat([action.payload]);
            return {
                ...state,
                contacts: newContactList
            };
        case "SET_CHAT_LIST":
            return {
                ...state,
                chats: action.payload
            };
        case "APPEND_TO_CHAT_LIST":
            const newChatList = [action.payload].concat(state.contacts);
            return {
                ...state,
                chats: newChatList
            };
        case "UNSET_LOADING":
            return {
                ...state,
                loading: false
            };
        case "REORDER_CURRENT_TO_FIRST":
            if (
                !state.chats.find(
                    e => e.contact.username === state.contactSelected.username
                )
            ) {
                return state;
            }
            const currentPosition = state.chats.findIndex(
                ({ contact }) =>
                    contact.username === state.contactSelected.username
            );
            const firstContact = { ...state.chats[currentPosition] };
            firstContact.lastMessage = action.payload;
            const otherContacts = state.chats
                .slice(0, currentPosition)
                .concat(state.chats.slice(currentPosition + 1));
            return {
                ...state,
                chats: [firstContact].concat(otherContacts)
            };
        default:
            return state;
    }
};

export default contactList;
