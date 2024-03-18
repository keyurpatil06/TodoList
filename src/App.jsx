import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setShowFinished] = useState(true)

  const saveToLocalStorage = (updatedTodos) => {
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  };

  useEffect(() => {
    let todoString = localStorage.getItem("todos")

    if (todoString) {
      setTodos(JSON.parse(todoString))
    }
  }, [])

  const handleAdd = () => {
    const newTodo = { id: uuidv4(), todo, isCompleted: false }
    setTodos([...todos, newTodo])
    saveToLocalStorage([...todos, newTodo])
    setTodo("")
  }

  const handleEdit = (id) => {
    let editedTodo = todos.filter(item => item.id === id)
    setTodo(editedTodo[0].todo)

    let newTodos = todos.filter(item => item.id !== id)
    saveToLocalStorage(newTodos)
    setTodos(newTodos)
  }

  const handleDelete = (id) => {
    let newTodos = todos.filter(item => item.id !== id)
    saveToLocalStorage(newTodos)
    setTodos(newTodos)
  }

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => item.id === id)

    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted
    saveToLocalStorage(newTodos)
    setTodos(newTodos)
  }

  const toggleFinish = () => {
    setShowFinished(!showFinished)
  }

  return (
    <>
      <Navbar />

      <div className="container mx-auto my-5 rounded-xl p-5 bg-[#6A040F] text-[#000]">
        <div className="add-todo flex flex-col items-center">
          <h2 className="font-bold text-3xl my-2 text-[#FAA307]">Add a Todo</h2>
          <input onChange={(e) => { setTodo(e.target.value) }} value={todo} type="text" className='w-5/6 md:w-1/2 py-2 px-4 font-bold tracking-wide bg-yellow-100 text-[#370617] rounded-xl my-2 outline-0' />
          <button onClick={handleAdd} disabled={todo.length < 1} className="py-2 px-4 bg-yellow-400 font-bold hover:bg-yellow-500 mt-2 rounded-xl disabled:cursor-not-allowed">Save</button>
        </div>

        <div className="h-[1px] md:w-3/5 bg-[#ff9d9d] mx-auto mt-5"></div>

        <div className=' flex justify-center mt-4'>
          <input type="checkbox" checked={showFinished} onChange={toggleFinish} className="accent-[#ffc152]" id='finisedTasks' />
          <label htmlFor="Show Finished" className="mx-2 text-lg text-[#FAA307]">Show Finished</label>
        </div>
        <h2 className="font-bold text-2xl my-3 flex justify-center text-[#FAA307]">Your Todos</h2>
        <div className="todos flex flex-col items-center">
          {todos.length === 0 && <div className='text-[#FAA307]'>No Todos to display</div>}

          {todos.map(item => {
            return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex my-2 w-5/6 md:w-1/2 justify-between bg-[#ffc152] text-[#370617] px-3 py-2 rounded-2xl font-bold">
              <div className='flex gap-4 items-center'>
                <input name={item.id} type="checkbox" className="accent-[#6A040F]" onChange={handleCheckbox} checked={item.isCompleted} />
                <div className={!item.isCompleted ? "" : "line-through"}>{item.todo}</div>
              </div>

              <div className="buttons flex items-center ml-2">
                <button onClick={() => { handleEdit(item.id) }} className="h-[2rem] px-3 py-2 bg-[#370617] hover:bg-[#6A040F] text-white mx-1 rounded-xl"><FaRegEdit /></button>
                <button onClick={() => { handleDelete(item.id) }} className="h-[2rem] px-3 py-2 bg-[#370617] hover:bg-[#6A040F] text-white mx-1 rounded-xl"><MdDelete /></button>
              </div>
            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App
