import React from "react";


function TodoList({todos, deleteTask, setEditId, setTask, loading}){
    if(loading){
        return <p>Loading....</p>;
    }


    return(
        <ul> 
        {todos.map((todo) => (
            <li key={todo.id}>
                {todo.text || todo.title}
            <button onClick={() => deleteTask(todo.id)}>Delete</button> 
            <button onClick={() => {
                setTask(todo.text || todo.title);
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