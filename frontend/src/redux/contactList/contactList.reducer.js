const INITIAL_STATE = {
    contactSelected: null,
    contacts: [],
    loading: true
};

const contactList = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "SELECT_CONTACT":
            return {
                ...state,
                contactSelected: action.payload
            };
        case "SET_CONTACT_LIST":
            return {
                ...state,
                contacts: action.payload
            };
        case "UNSET_LOADING":
            return {
                ...state,
                loading: false
            };
        default:
            return state;
    }
};

export default contactList;
