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
        case "CHANGE_ORDER" /* 
            console.log(state.contactSelected);
            const toChange = state.contacts.findIndex(
                contact => contact.id === state.contactSelected.id
            );
            const firstArr = state.contacts.slice(0, toChange);
            const secondArr = state.contacts.slice(toChange + 1);
            console.log(firstArr);
            console.log("toChange = " + toChange);
            console.log(secondArr); */:
            //For now, just throwing last element to the top kkkk
            const first = state.contacts[state.contacts.length - 1];
            const newList = [first].concat(
                state.contacts.slice(0, state.contacts.length - 1)
            );
            return {
                ...state,
                contacts: newList
            };
        case "REORDER_CURRENT_TO_FIRST":
            if (
                !state.chats.find(
                    e => e.contact.username === state.contactSelected.username
                )
            ) {
                console.log(
                    state.contactSelected.username +
                        " is not in the chat list... yet!"
                );
                return state;
            }
            return state;
        default:
            return state;
    }
};

export default contactList;
