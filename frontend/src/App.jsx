import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import Footer from './components/Footer'
import AboutPage from './pages/AboutPage'
import ServicesPage from './pages/ServicesPage'
import ProductPage from './pages/ProductPage'
import CasesPage from './pages/CasesPage'
import BlogsPage from './pages/BlogsPage'
import ContactPage from './pages/ContactPage'
import CasesDetails from './pages/CasesDetails'
import BlogDetails from './pages/BlogDetails'

function App() {

  return (
    <>
      {/* hello */}
      <BrowserRouter>
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/about' element={<AboutPage />} />
          <Route path='/services' element={<ServicesPage />} />
          <Route path='/product' element={<ProductPage />} />
          <Route path='/cases' element={<CasesPage />} />
          <Route path='/blogs' element={<BlogsPage />} />
          <Route path='/Contact' element={<ContactPage />} />

          <Route path='/cases-details/:id' element={<CasesDetails />} />
          <Route path='/blogs-details/:id' element={<BlogDetails />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
