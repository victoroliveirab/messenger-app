const INITIAL_STATE = {
    contactSelected: null,
    contactSelectedObj: null,
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
        case "SET_CONTACT_OBJ":
            console.log("payload to set contact obj");
            console.log(action.payload);
            return {
                ...state,
                contactSelectedObj: action.payload
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
        default:
            return state;
    }
};

export default contactList;
