import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import userReducer from "./user/user.reducer";
import contactListReducer from "./contactList/contactList.reducer";
import chatReducer from "./chat/chat.reducer";
import modalReducer from "./modal/modal.reducer";
import storyReducer from "./story/story.reducer";
import flashListReducer from "./flashList/flashList.reducer";

const rootReducer = history =>
    combineReducers({
        router: connectRouter(history),
        user: userReducer,
        contactList: contactListReducer,
        chat: chatReducer,
        modal: modalReducer,
        story: storyReducer,
        flashList: flashListReducer
    });

export default rootReducer;
