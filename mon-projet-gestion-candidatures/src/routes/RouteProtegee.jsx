import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const RouteProtegee = ({ children, roleAttendu }) => {
  const { user, token } = useSelector((state) => state.auth);

  // Si aucun token ou rôle incorrect, redirige vers /connexion
  if (!token || !user || user.role !== roleAttendu) {
    return <Navigate to="/connexion" />;
  }

  return children;
};

export default RouteProtegee;
