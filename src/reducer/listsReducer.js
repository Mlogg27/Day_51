const listsReducer = (state, action) => {
  switch (action.action) {
    case "lists/onSave":
      return [...state.lists, action.payload];
    case "lists/done":
      const newLists = state.lists.map((task) =>
        task.id === action.payload.id ? { ...task, isDone: !task.isDone } : task
      );
      return newLists;
    default:
      return state.lists;
  }
};

export default listsReducer;
