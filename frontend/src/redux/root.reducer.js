import { combineReducers } from "redux";
import userReducer from "./user/user.reducer";
import contactListReducer from "./contactList/contactList.reducer";
import chatReducer from "./chat/chat.reducer";

export default combineReducers({
    user: userReducer,
    contactList: contactListReducer,
    chat: chatReducer
});
