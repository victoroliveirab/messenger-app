import { combineReducers } from "redux";
import userReducer from "./user/user.reducer";
import contactListReducer from "./contactList/contactList.reducer";
import chatReducer from "./chat/chat.reducer";
import flashListReducer from "./flashList/flashList.reducer";

export default combineReducers({
    user: userReducer,
    contactList: contactListReducer,
    chat: chatReducer,
    flashList: flashListReducer
});
