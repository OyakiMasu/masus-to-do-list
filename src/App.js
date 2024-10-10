import { useState } from 'react';
import './App.css';
import TodoList from './TodoList';

function App() {

   const [ todos, setTodos] = useState([ 
    { id:1, text: 'Learning Reaact' },
    { id:2, text: 'Build a To-Do List'},
    { id:3, text: 'Understand props and state'}
  ]);

  const [task, setTask] = useState('')
  const [editId, setEditId] = useState(null);
  

  // const addTask = () => {
  //   if (task !== ''){
  //     const newTask = { id: todos.length + 1, text: task };
  //     setTodos([...todos, newTask]);
  //     setTask('');
  //   }
  // }

  function addTask(){
    if(task !== ""){ // Check if the task is not an empty string
      const newTask = { id: todos.length + 1, text: task }; // Create a new task object
      setTodos([...todos, newTask]); // Update the todos state by adding the new task
      setTask('');  // Clear the input field after adding the task
    }
  }

    function deleteTask(id){
      const updatedTodos = todos.filter((todo) => todo.id !== id);
      setTodos(updatedTodos);
    }

    function updateTask(id, newText){
      const updatedTodos = todos.map((todo) => {
        if(todo.id === id){
          return { ...todo, text: newText };
        }
        return todo;
      })
      setTodos(updatedTodos);
      setEditId(null);
      setTask('');
    }

  
  return (
    <div className="App">
      <h1> My to do list</h1>

      <TodoList todos={todos} deleteTask={deleteTask} updateTask={updateTask} setEditId={setEditId}setTask={setTask} />
        <input
          type='text'
          value={task}
          onChange={(e) => setTask(e.target.value)}
        
      />
      {/* <button onClick={deleteTask}> Delete Task</button> */}
      <button onClick={addTask}> Add Task</button>
      <button onClick={() => updateTask(editId, task)}> Update Task</button>



    </div>
  );
}

export default App;
