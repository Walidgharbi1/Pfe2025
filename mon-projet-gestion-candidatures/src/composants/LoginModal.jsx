import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/slices/authSlice";

export default function LoginModal({ isOpen, onClose }) {
  const [login, setLogin] = useState({
    email: "",
    mot_de_passe: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogin((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(login)); // Save the offer (either create or update)
    onClose(); // Close the modal after saving
  };

  return (
    isOpen && (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-100 to-white">
        <div className="bg-white shadow-xl p-8 rounded-2xl w-full max-w-md">
          <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
            Connexion
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1">
                Adresse e-mail
              </label>
              <input
                type="email"
                className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={login.email}
                name="email"
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Mot de passe
              </label>
              <input
                type="password"
                className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={login.mot_de_passe}
                name="mot_de_passe"
                onChange={handleChange}
                required
              />
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
    )
  );
}
