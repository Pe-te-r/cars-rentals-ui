import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Service from './pages/Service';
import About from './pages/About';
import { AuthProvider } from './context/authContext';
import AuthController from './pages/auth/authComponent';
import Dashboard from './pages/dashboard/DashBoard';

const routes = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: 'service', element: <Service /> },
  { path: 'about', element: <About /> },
  { path: 'dashboard/*', element: <Dashboard /> },
  { path: '*', element: <h1>Page Not Found</h1> },
]);

function App() {
  return (
    <AuthProvider>
      <div className="mainContainer bg-gray-900" style={{ minHeight: '100vh',position:'relative' }}>
        <RouterProvider router={routes} />
      </div>
      <AuthController/>
    </AuthProvider>
  );
}

export default App;
