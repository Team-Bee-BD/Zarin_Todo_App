import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../redux/features/todos/todoSlice";
import { nanoid } from "nanoid";

const TodoForm = () => {
  const [text, setText] = useState("");

  const dispatch = useDispatch();

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (text.trim() === "") return;

    dispatch(
      addTodo({
        id: nanoid(),
        text: text.trim(),
        completed: false,
      })
    );
    setText("");
  };
  return (
    <form
      onSubmit={handleOnSubmit}
      className="flex items-center gap-2 mb-4"
      action=""
    >
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add New Todo"
        className="flex-1 p-2 border focus:outline-none focus:border-[#ecb593] rounded-md text-black"
      />
      <button
        type="submit"
        className="bg-[#f0c6ab] text-white px-6 py-2 rounded hover:bg-[#ecb593]"
      >
        Add
      </button>
    </form>
  );
};

export default TodoForm;
