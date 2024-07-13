import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Service from './pages/Service';
import About from './pages/About';
import { AuthProvider } from './context/authContext';
import Dashboard from './pages/dashboard/admin/DashBoard';
import Toast from './pages/auth/ToastResponse';
import { DetailsProvider } from './context/LocalStorageContext';
import UserDashboard from './pages/dashboard/user/UserDashBoard';

const routes = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: 'service', element: <Service /> },
  { path: 'about', element: <About /> },
  { path: 'admin/*', element: <Dashboard /> },
  { path: 'user/*', element: <UserDashboard /> },
  { path: '*', element: <h1>Page Not Found</h1> },
]);
function App() {
  return (
    <DetailsProvider>
      <AuthProvider>
        <div className="mainContainer bg-gray-900" style={{ minHeight: '100vh',position:'relative' }}>
          <RouterProvider router={routes} />
        </div>
        <Toast />
      </AuthProvider>
    </DetailsProvider>
  );
}

export default App;
