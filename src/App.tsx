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

const userData = localStorage.getItem('user')

let userJson
if(userData){
  userJson =JSON.parse(userData ) || {};
}
let isAdmin = false
if(userJson.role === 'admin'){
  isAdmin = true
}

const routes = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: 'service', element: <Service /> },
  { path: 'about', element:(<ProtectedRoute element={ About } isAuthenticated={true}/>) },
  { path: 'admin/*', element: (<ProtectedRoute element={Dashboard} isAuthenticated={userJson?.login} isAdmin={isAdmin}/>) },
  { path: 'dashboard/*', element:(<ProtectedRoute element={UserDashboard } isAuthenticated={userJson?.login}/>) },
  { path: '*', element: <h1>Page Not Found</h1> },
]);
// const isAuthenticated = true;
// const isAdmin = true; 
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
