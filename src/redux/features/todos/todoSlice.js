import { createSlice } from "@reduxjs/toolkit";

const loadTodoFromLocalStorage = () => {
  try {
    const data = localStorage.getItem("demoTodos");
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.log(error);
    return [];
  }
};

const saveTodosToLocalStorage = (todos) => {
  localStorage.setItem("demoTodos", JSON.stringify(todos));
};

const todoSlice = createSlice({
  name: "todos",
  initialState: {
    todos: loadTodoFromLocalStorage(),
    filter: {
      status: "all",
      search: "",
    },
  },
  reducers: {
    addTodo: (state, action) => {
      state.todos.push(action.payload);
      saveTodosToLocalStorage(state.todos);
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      saveTodosToLocalStorage(state.todos);
    },
    toggleComplete: (state, action) => {
      const todo = state.todos.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
      saveTodosToLocalStorage(state.todos);
    },
    editTodo: (state, action) => {
      const { todoId, newText } = action.payload;
      const todo = state.todos.find((todo) => todo.id === todoId);
      if (todo) {
        todo.text = newText;
      }
      saveTodosToLocalStorage(state.todos);
    },
    setFilterStatus: (state, action) => {
      state.filter.status = action.payload;
    },
    setSearchFilter: (state, action) => {
      state.filter.search = action.payload;
    },
  },
});

export const {
  addTodo,
  deleteTodo,
  toggleComplete,
  editTodo,
  setFilterStatus,
  setSearchFilter,
} = todoSlice.actions;

export default todoSlice.reducer;
