import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, resetAuthMessages } from "../../redux/slices/authSlice";
import { toast } from "react-toastify";
import { FaEnvelope, FaLock } from "react-icons/fa";
export default function Connexion() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  // 🔁 Rediriger si déjà connecté

  const handleLogin = async (e) => {
    e.preventDefault();
    let newErrors = {};
    if (!password.trim()) newErrors.password = "mot de passe est requis";
    if (!email.trim()) {
      newErrors.email = "L'email est requis";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = "L'email est invalide";
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      try {
        dispatch(loginUser({ email: email, mot_de_passe: password }));
      } catch (err) {
        console.error("Erreur de connexion :", err);
        alert("Email ou mot de passe incorrect");
      }
    }
  };
  const { user, msg, error } = useSelector((state) => state.auth);
  useEffect(() => {
    if (msg) {
      toast.success(msg);
      dispatch(resetAuthMessages());
    }
    if (error) {
      toast.error(error);
      dispatch(resetAuthMessages());
    }

    if (user) {
      if (user.role == "admin") {
        setTimeout(() => {
          navigate("/adminDashboard");
        }, 2500);
      } else if (user.role == "candidat") {
        setTimeout(() => {
          navigate("/CandidatDashboard");
        }, 2500);
      } else if (user.role == "chefR") {
        setTimeout(() => {
          navigate("/chefr_dashboard");
        }, 2500);
      }
    }
  }, [error, msg, user]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-100 to-white">
      <div className="bg-white shadow-xl p-8 rounded-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Connexion
        </h2>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <div>
              <label className="block text-sm font-medium mb-1">
                <FaEnvelope className="inline mr-2" /> Adresse e-mail
              </label>
              <input
                type="email"
                className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>
          <div>
            <div>
              <label className="block text-sm font-medium mb-1">
                <FaLock className="inline mr-2" /> Mot de passe
              </label>
              <input
                type="password"
                className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition"
          >
            Se connecter
          </button>
        </form>

        <p className="mt-6 text-center text-sm">
          Pas encore de compte ?{" "}
          <a
            href="/inscription"
            className="text-blue-600 hover:underline font-medium"
          >
            Créer un compte
          </a>
        </p>
      </div>
    </div>
  );
}
