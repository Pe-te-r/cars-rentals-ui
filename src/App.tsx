import {  BrowserRouter,  Route,  Routes } from 'react-router-dom';
import Home from './pages/Home';
import Service from './pages/Service';
import About from './pages/About';
import Contact from './pages/Contact';
import Navbar from './components/NavBar';
import Footer from './components/Footer';
import { useState } from 'react';
import AuthController from './components/authComponent';
import Error from './pages/Error';


function App() {
  // contact page modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

   // Auth modal state
   const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
   const [isLogin, setIsLogin] = useState(true); 
 
   const openAuthModal = (value: boolean) => {
     setIsLogin(value);
     setIsAuthModalOpen(true);
   };
 
   const closeAuthModal = () => setIsAuthModalOpen(false);



  return (
    <BrowserRouter>  
      <div className="mainContainer bg-gray-900" style={{ minHeight: '100vh' }}>
        <Navbar openContact={openModal} setIsLogin={setIsLogin} openAuthModal={openAuthModal} />
        <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/about' element={<About/>} />
            <Route path='/service' element={<Service/>} />
            <Route path='*' element={<Error/>} />
  
        </Routes>
        <Contact isOpen={isModalOpen} closeModal={closeModal} />
        <AuthController isOpen={isAuthModalOpen} closeModal={closeAuthModal} isLogin={isLogin} />
        <Footer/>
      </div>
    </BrowserRouter>
  )
}

export default App


