import { Navigate } from 'react-router-dom';
import { isAuthorized } from '../utils/auth';

const PrivateRoute = ({ children }) => {
  return isAuthorized() ? children : <Navigate to="/" />;
};

export default PrivateRoute;
