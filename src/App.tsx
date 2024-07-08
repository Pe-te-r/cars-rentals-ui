import {  BrowserRouter,  Route,  RouterProvider,  Routes, createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Service from './pages/Service';
import About from './pages/About';
import Contact from './pages/Contact';
import Navbar from './components/NavBar';
import Footer from './components/Footer';


const routes=([
  {
    path: '/',
    element:<Home/> ,
  },
  {
    path: "service",
    element: <Service/>
  },
  {
    path: "about",
    element: <About/>
  },
  {
    path: "contact",
    element: <Contact/> ,
  },
  {
    path:'login',
    element: <Login />,
  },
  {
    path:'register',
    element: <Register/>,
  },
  {
    path: "*",
    element: <h1>Page Not Found</h1>
  }

]);


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
        <Navbar/>
        <Routes>
            {routes.map((route, index) =>{
              return <Route key={index} path={route.path} element={route.element} />
            })}
        </Routes>
        <Footer/>
      </div>
    </BrowserRouter>
  )
}

export default App


