// src/App.tsx or main router file
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import LoginPage from './pages/Login';
import SignupPage from './pages/Signup';
import ForgotPasswordPage from './pages/Forgotpassword';
import DashboardPage from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import { isAuthorized } from './utils/auth';

const App = () => {
  const isAuthenticated = isAuthorized();

  return (
    <Router>
      <Toaster  position="bottom-center"
  reverseOrder={false} />
      <Routes>
        {/* Public Routes */}
        <Route
          path="/"
          element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />}
        />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Private Routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
