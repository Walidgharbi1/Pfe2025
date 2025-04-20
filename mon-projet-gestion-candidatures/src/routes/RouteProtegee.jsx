import { Navigate } from 'react-router-dom';

const RouteProtegee = ({ children, roleAttendu }) => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  // Si aucun token ou rôle incorrect, redirige vers /connexion
  if (!token || !user || user.role !== roleAttendu) {
    return <Navigate to="/connexion" />;
  }

  return children;
};

export default RouteProtegee;
