import { Route, Routes } from 'react-router-dom';
import Content from './Content';
// Import other components for nested routes

const DashboardRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<div>Welcome to the Dashboard</div>} />
      <Route path="content" element={<Content />} />
      {/* Define other nested routes here */}
    </Routes>
  );
};

export default DashboardRoutes;
