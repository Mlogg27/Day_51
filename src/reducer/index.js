import { v4 } from "uuid";
import listsReducer from "./listsReducer";

const reducer = (state, action) => {
  return {
    ...state,
    lists: listsReducer(state, action),
  };
};

export default reducer;
