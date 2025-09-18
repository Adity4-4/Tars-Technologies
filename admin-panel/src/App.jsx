import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import GetintouchEntires from './pages/GetintouchEntires'
import CasesPage from './pages/CasesPage'
import BlogsPage from './pages/BlogsPage'

function App() {

  return (
    <>
    <BrowserRouter>
    <Sidebar />
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/getintouch' element={<GetintouchEntires />} />
        <Route path='/cases' element={<CasesPage />} />
        <Route path='/blogs' element={<BlogsPage />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
