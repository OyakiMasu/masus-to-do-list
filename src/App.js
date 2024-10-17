import { useState, useEffect } from 'react';
import './App.css';
import TodoList from './TodoList';

function App() {

  const [ todos, setTodos] = useState([]);
  const [task, setTask] = useState('')
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(true);


  // Fetch tasks from an API or local JSON file
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos?_limit=5")
    .then((response) => response.json())
    .then((data) => {
      setTodos(data);
      setLoading(false); // Set loading to false once data is fetched
    })
    .catch((error) => console.error('Error fetching tasks', error))

  }, []);
  


  // function addTask(){
  //   if(task !== ""){ // Check if the task is not an empty string
  //     const newTask = { id: todos.length + 1, text: task }; // Create a new task object
  //     setTodos([...todos, newTask]); // Update the todos state by adding the new task
  //     setTask('');  // Clear the input field after adding the task
  //   }
  // }

  function addTask(){
    if(task !== ""){  // Check if the task is not an empty string
      const newTask = { title: task }; 

// Make a POST request to add a new task 
      fetch('https://jsonplaceholder.typicode.com/todos', {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json',

        },
        body: JSON.stringify(newTask),
      })
        .then((response) => response.json())
        .then((data) => {
          setTodos([...todos, data]); 
          setTask(''); 
        })
        .catch((error) => console.error(' Error adding task', error));
    }
  }

  // Make an Update request to update the info in the task added 

    function deleteTask(id){
      fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: 'DELETE',

      }) 
        .then((response) => {
          if (response.ok) {
            const updatedTodos = todos.filter((todo) => todo.id !== id);
            setTodos(updatedTodos); // Update local state to remove the task
            console.log(`Task with ID ${id} deleted sucessfully.`);
          } else {
            console.error(' Failed to delete task. ');
          }
        }) 
          .catch((error) => console.error('Error deleting task:', error));
    
    }

    function updateTask(id, newText){
        // Find the task to update
        const taskToUpdate = todos.find((todo) => todo.id === id);

        // Create the updated task object
        const updatedTask = { ...taskToUpdate, title: newText };

      // Make a PUT request to update the task in the server
      fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: 'PUT',
          headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTask),
      })  

        .then((response) => response.json())
        .then((data) => {
        // Update local state with the modified task        
          const updatedTodos = todos.map((todo) =>
            todo.id === id ? data : todo
          );
        setTodos(updatedTodos); // Update state
        setEditId(null); // Exit edit mode
        setTask(''); // Clear the input field
      })
      .catch((error) => console.error('Error updating task:', error));
  }
        
    //       const updatedTodos = todos.map((todo) => {
    //         if(todo.id === id){
    //           return { ...todo, title: newText };
    //         }
    //         return todo;
    //       })
    //       setTodos(updatedTodos);
    //       setEditId(null);
    //       setTask('');
    //     })
     
    // }

  
  return (
    <div className="App">
      <h1> My To Do List</h1>

      <TodoList 
        todos={todos}  
        deleteTask={deleteTask} 
        updateTask={updateTask} 
        editId = {editId}
        setEditId={setEditId}
        setTask={setTask} 
        loading={loading} //Pass loading state
        />

        <input
          type='text'
          value={task}
          onChange={(e) => setTask(e.target.value)}
        
      />
      <button onClick={addTask}> Add Task</button>
      {/* <button onClick={() => updateTask(editId, task)}></button>  */}

      {/* {loading && <p>Loading tasks...</p>} */}


    </div>
    
  );
}

export default App;
