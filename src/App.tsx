import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Service from './pages/Service';
import About from './pages/About';
import { AuthProvider } from './context/authContext';
import Dashboard from './pages/dashboard/admin/DashBoard';
import Toast from './pages/auth/ToastResponse';
import { DetailsProvider } from './context/LocalStorageContext';
import UserDashboard from './pages/dashboard/user/UserDashBoard';
import ProtectedRoute from './protectRoute';
import { ToastProvider } from './context/smallToast';
import VehiclesPhoto from './pages/dashboard/admin/vehicles/vehiclesPhoto';
import VehiclesDetails from './pages/dashboard/user/vehicles_display/VehiclesDetails';



const routes = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: 'service', element: <Service /> },
  { path: 'about', element:< About/>},
  { path: 'admin/*', element: (<ProtectedRoute element={Dashboard} role='admin'/>) },
  { path: 'dashboard/*', element:(<ProtectedRoute element={UserDashboard } role='user'/>) },
  {path: 'vehicles',element: <VehiclesPhoto/>,
    children:[
      {path:':id',element: <VehiclesDetails/>},
    ],
  },
  { path: '*', element: <h1>Page Not Found</h1> },
]);
// const isAuthenticated = true;
// const isAdmin = true; 
function App() {
  return (
    <DetailsProvider>
      <AuthProvider>
        <ToastProvider>
        <div className="mainContainer bg-gray-900" style={{ minHeight: '100vh',position:'relative' }}>
          <RouterProvider router={routes} />
        </div>
        </ToastProvider>
        <Toast />
      </AuthProvider>
    </DetailsProvider>
  );
}

export default App;
