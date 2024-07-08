import {  BrowserRouter,  Route,  RouterProvider,  Routes, createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Service from './pages/Service';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/NavBar';
import Footer from './components/Footer';


const routes=createBrowserRouter([
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
      <RouterProvider router={routes} />
  )
}

export default App


