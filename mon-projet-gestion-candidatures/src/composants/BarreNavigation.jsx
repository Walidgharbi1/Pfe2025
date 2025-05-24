import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/slices/authSlice";
import { toast } from "react-toastify";
import {
  FaHome,
  FaBriefcase,
  FaNewspaper,
  FaSignInAlt,
  FaUserPlus,
  FaSignOutAlt,
  FaUserTie,
  FaUserCog,
  FaUserGraduate,
  FaUserCircle,
} from "react-icons/fa";
import { HiMenuAlt3 } from "react-icons/hi";
import { useState, useEffect } from "react";

function BarreNavigation() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    toast.warn("Vous êtes déconnecté");
    setTimeout(() => {
      navigate("/connexion");
    }, 1500);
  };

  const handleDashboardRedirect = () => {
    if (user) {
      switch (user.role) {
        case "admin":
          navigate("/AdminDashboard");
          break;
        case "chefR":
          navigate("/chefr_dashboard");
          break;
        case "candidat":
          navigate("/CandidatDashboard");
          break;
        default:
          navigate("/");
      }
    }
  };

  const getDashboardIcon = () => {
    if (!user) return null;
    switch (user.role) {
      case "admin":
        return <FaUserCog className="mr-1" />;
      case "chefR":
        return <FaUserTie className="mr-1" />;
      case "candidat":
        return <FaUserGraduate className="mr-1" />;
      default:
        return <FaUserCircle className="mr-1" />;
    }
  };

  // Close mobile menu when screen size changes
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo/Brand */}
          <Link
            to="/"
            className="flex items-center text-xl font-bold hover:text-blue-100 transition-colors"
          >
            <FaHome className="mr-2" />
            <span className="hidden sm:inline">Gestion des Candidatures</span>
            <span className="sm:hidden">GDC</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6 items-center">
            <Link
              to="/offres"
              className="flex items-center hover:text-blue-200 transition-colors"
            >
              <FaBriefcase className="mr-1" />
              Offres
            </Link>
            <Link
              to="/actualites"
              className="flex items-center hover:text-blue-200 transition-colors"
            >
              <FaNewspaper className="mr-1" />
              Actualités
            </Link>

            {!user ? (
              <>
                <Link
                  to="/connexion"
                  className="flex items-center hover:text-blue-200 transition-colors"
                >
                  <FaSignInAlt className="mr-1" />
                  Connexion
                </Link>
                <Link
                  to="/inscription"
                  className="flex items-center bg-white text-blue-600 px-3 py-1 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <FaUserPlus className="mr-1" />
                  Inscription
                </Link>
              </>
            ) : (
              <>
                <button
                  onClick={handleDashboardRedirect}
                  className="flex items-center bg-white text-blue-600 px-3 py-1 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  {getDashboardIcon()}
                  Dashboard
                </button>

                <div className="flex items-center space-x-2 ml-2">
                  <span className="text-sm italic hidden lg:inline">
                    Bienvenue, {user.nom}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="flex items-center bg-blue-700 text-white px-3 py-1 rounded-lg hover:bg-blue-800 transition-colors"
                    title="Déconnexion"
                  >
                    <FaSignOutAlt />
                  </button>
                </div>
              </>
            )}
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-2xl focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <HiMenuAlt3 />
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-2 space-y-3">
            <Link
              to="/offres"
              className="flex items-center p-2 hover:bg-blue-500 rounded transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <FaBriefcase className="mr-2" />
              Offres
            </Link>
            <Link
              to="/actualites"
              className="flex items-center p-2 hover:bg-blue-500 rounded transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <FaNewspaper className="mr-2" />
              Actualités
            </Link>

            {!user ? (
              <>
                <Link
                  to="/connexion"
                  className="flex items-center p-2 hover:bg-blue-500 rounded transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <FaSignInAlt className="mr-2" />
                  Connexion
                </Link>
                <Link
                  to="/inscription"
                  className="flex items-center p-2 bg-white text-blue-600 rounded hover:bg-blue-100 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <FaUserPlus className="mr-2" />
                  Inscription
                </Link>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    handleDashboardRedirect();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center p-2 bg-white text-blue-600 rounded hover:bg-blue-100 transition-colors"
                >
                  {getDashboardIcon()}
                  <span className="ml-2">Dashboard</span>
                </button>

                <div className="flex items-center justify-between p-2">
                  <span className="text-sm italic">Bienvenue, {user.nom}</span>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center bg-blue-700 text-white p-2 rounded hover:bg-blue-800 transition-colors"
                  >
                    <FaSignOutAlt className="mr-1" />
                    Déconnexion
                  </button>
                </div>
              </>
            )}
          </nav>
        )}
      </div>
    </header>
  );
}

export default BarreNavigation;
