import './App.css';
import { useState } from 'react';

function Working({ workingTodo, todos, setTodos}) {
  const deleteTodo = (id) => {
    const filtered = todos.filter((todo) => {
      return todo.id !== id
    })
    setTodos(filtered)
  }

  const setDone = (id) => {
    const filtered = todos.filter((todo) => {
      if (todo.id === id) {
        todo.isDone = true;
      }
      return todo
    })
    setTodos(filtered)
  }

  return (
    <div className='box'>
      <div className='text_box'>
        <h2>{workingTodo.title}</h2>
        <p>{workingTodo.body}</p>
      </div>
      <div className='button_box'>
        <button className='delete_button' onClick={() => deleteTodo(workingTodo.id)}>delete</button>
        <button className='done_button' onClick={() => setDone(workingTodo.id)}>done</button>
      </div>
    </div>
  )
}

function Done({ doneTodo, todos, setTodos}) {
  const deleteTodo = (id) => {
    const filtered = todos.filter((todo) => {
      return todo.id !== id
    })
    setTodos(filtered)
  }

  const cancelDone = (id) => {
    const filtered = todos.filter((todo) => {
      if (todo.id === id) {
        todo.isDone = false;
      }
      return todo
    })
    setTodos(filtered)
  }

  return (
    <div className='box'>
      <div className='text_box'>
        <h2>{doneTodo.title}</h2>
        <p>{doneTodo.body}</p>
      </div>
      <div className='button_box'>
        <button className='delete_button' onClick={() => deleteTodo(doneTodo.id)}>delete</button>
        <button className='done_button' onClick={() => cancelDone(doneTodo.id)}>cancel</button>
      </div>
    </div>
  )
}

function App() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const [todos, setTodos] = useState([{ id: 0, title: '', body: '', isDone: false }]);

  const onChangeHandler1 = (event) => {
    setTitle(event.target.value)
  }

  const onChangeHandler2 = (event) => {
    setContent(event.target.value)
  }

  const onSubmitHandler = () => {
    if (title !== '' && content !== '') {
      setTodos([...todos, { id: todos[todos.length - 1].id + 1, title: title, body: content, isDone: false }])
      setTitle('');
      setContent('');
    }
  }

  return (
    <div className="container">
      <div className="title_container">
        <p>My Todo List</p>
        <p>React</p>
      </div>

      <div className="input_container">
        <div>
          <label>title</label>
          <input type="text" className="input" onChange={onChangeHandler1} value={title} />
          <label>content</label>
          <input type="text" className="input" onChange={onChangeHandler2} value={content} />
        </div>
        <button className='add_button' onClick={onSubmitHandler}>Add</button>
      </div>

      <div className='content_container'>
        <h2>Working.. 🔥</h2>
        <div className='box_container'>
          {todos.map((todo) => {
            if (todo.id > 0) {
              if (todo.isDone) {
                return null
              }
              return (<Working 
                workingTodo={todo} 
                todos={todos} 
                setTodos={setTodos}
                key={`todo-${todo.id}`} />)
            }
          })}
        </div>

        <h2>Done..! 🎉</h2>
        <div className='box_container'>
          {todos.map((todo) => {
            if (todo.isDone) {
              return (<Done 
                doneTodo={todo} 
                todos={todos} 
                setTodos={setTodos}
                key={`todo-${todo.id}`} />)
            }
          })}
        </div>
      </div>

    </div>
  );
}

export default App;