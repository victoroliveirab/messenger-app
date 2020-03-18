import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import userReducer from "./user/user.reducer";
import contactListReducer from "./contactList/contactList.reducer";
import chatReducer from "./chat/chat.reducer";
import flashListReducer from "./flashList/flashList.reducer";

const rootReducer = history =>
    combineReducers({
        router: connectRouter(history),
        user: userReducer,
        contactList: contactListReducer,
        chat: chatReducer,
        flashList: flashListReducer
    });

export default rootReducer;
