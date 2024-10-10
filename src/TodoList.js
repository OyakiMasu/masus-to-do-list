import React from "react";


function TodoList({todos, deleteTask, updateTask, setEditId, setTask}){
    return(
        <ul> 
        {todos.map((todo) => (
            <li key={todo.id}>
                {todo.text}
            <button onClick={() => deleteTask(todo.id)}>Delete</button> 
            <button onClick={() => {
                setTask(todo.text);
                setEditId(todo.id);
            }}>
                Edit
                
            </button>
                
            </li>
        ))}
        </ul>
    );

};


export default TodoList;