import {  BrowserRouter,  Route,  Routes } from 'react-router-dom';
import Home from './pages/Home';
import Service from './pages/Service';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
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


