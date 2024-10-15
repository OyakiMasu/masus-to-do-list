import React, { useState } from "react";

function TodoList({ todos, deleteTask, updateTask, setEditId, setTask, loading }) {
  const [isEditing, setIsEditing] = useState(null); // Track which task is being edited
  const [editText, setEditText] = useState(''); // Track the text for the current edit

  return (
    <div>
      {loading ? ( // Display loading message if tasks are being fetched
        <p>Loading tasks...</p>
      ) : (
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              {isEditing === todo.id ? ( // If editing, show input and Save button
                <>
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                  <button
                    onClick={() => {
                      updateTask(todo.id, editText); // Call updateTask from App.js
                      setIsEditing(null); // Exit edit mode
                    }}
                  >
                    Save
                  </button>
                </>
              ) : (
                <>
                  <span>{todo.title}</span>
                  <button
                    onClick={() => {
                      setEditId(todo.id); // Set the task to edit mode in App.js
                      setTask(todo.title); // Fill the input field with current title
                      setIsEditing(todo.id); // Track the editing state locally
                      setEditText(todo.title); // Set the text for editing
                    }}
                  >
                    Edit
                  </button>
                  <button onClick={() => deleteTask(todo.id)}>Delete</button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TodoList;
