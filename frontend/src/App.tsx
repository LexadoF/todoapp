import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login';
import NotFound from './components/NotFound';
import Dashboard from './components/dahboard';
import CreateTodo from './components/createTodo';
import EditTodo from './components/editTodo';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-todo" element={<CreateTodo />} />
        <Route path="/edit-todo/:id" element={<EditTodo />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App
