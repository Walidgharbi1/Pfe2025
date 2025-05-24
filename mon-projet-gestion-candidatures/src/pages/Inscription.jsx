import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, resetAuthMessages } from "../../redux/slices/authSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaPhone,
  FaHome,
  FaIdCard,
  FaFilePdf,
  FaSpinner,
} from "react-icons/fa";

export default function Inscription() {
  const dispatch = useDispatch();
  const [cvFile, setCvFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    mot_de_passe: "",
    telephone: "",
    adresse: "",
    cin: "",
    cv: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nom.trim()) newErrors.nom = "Le nom est requis";
    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "L'email est invalide";
    }
    if (!formData.mot_de_passe) {
      newErrors.mot_de_passe = "Le mot de passe est requis";
    } else if (formData.mot_de_passe.length < 6) {
      newErrors.mot_de_passe =
        "Le mot de passe doit contenir au moins 6 caractères";
    }
    if (!formData.telephone.trim()) {
      newErrors.telephone = "Le téléphone est requis";
    } else if (!/^[0-9]{8}$/.test(formData.telephone)) {
      newErrors.telephone = "Le téléphone doit contenir exactement 8 chiffres";
    }
    if (!formData.adresse.trim()) newErrors.adresse = "L'adresse est requise";
    if (!formData.cin.trim()) {
      newErrors.cin = "Le CIN est requis";
    } else if (!/^[0-9]{8}$/.test(formData.cin)) {
      newErrors.cin = "Le CIN doit contenir exactement 8 chiffres";
    }
    if (!cvFile) newErrors.cv = "Le CV est requis";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    const sendFormData = new FormData();
    sendFormData.append("nom", formData.nom);
    sendFormData.append("email", formData.email);
    sendFormData.append("mot_de_passe", formData.mot_de_passe);
    sendFormData.append("telephone", formData.telephone);
    sendFormData.append("adresse", formData.adresse);
    sendFormData.append("cin", formData.cin);
    sendFormData.append("cv", cvFile);

    try {
      dispatch(registerUser(sendFormData));

      setTimeout(() => {
        navigate("/connexion");
      }, 2500);
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors de l'inscription");
    } finally {
      setIsSubmitting(false);
    }
  };

  const { error, msg } = useSelector((state) => state.auth);

  useEffect(() => {
    if (msg) {
      toast.success(msg);
      dispatch(resetAuthMessages());
    }
    if (error) {
      toast.error(error);
      dispatch(resetAuthMessages());
    }
  }, [error, msg, dispatch]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-4xl">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Créer un compte
          </h2>
          <p className="mt-2 text-gray-600">
            Remplissez le formulaire pour vous inscrire
          </p>
        </div>

        <div className="mt-8 bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="py-8 px-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Column 1 */}
                <div className="space-y-6">
                  {/* Nom */}
                  <div>
                    <label
                      htmlFor="nom"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      <FaUser className="inline mr-2" /> Nom complet
                    </label>
                    <div className="relative">
                      <input
                        id="nom"
                        name="nom"
                        type="text"
                        required
                        onChange={handleChange}
                        value={formData.nom}
                        className={`block w-full pl-10 pr-3 py-2 border ${
                          errors.nom ? "border-red-500" : "border-gray-300"
                        } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                        placeholder="Votre nom complet"
                      />
                      <FaUser className="absolute left-3 top-3 text-gray-400" />
                    </div>
                    {errors.nom && (
                      <p className="mt-1 text-sm text-red-600">{errors.nom}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      <FaEnvelope className="inline mr-2" /> Adresse email
                    </label>
                    <div className="relative">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        onChange={handleChange}
                        value={formData.email}
                        className={`block w-full pl-10 pr-3 py-2 border ${
                          errors.email ? "border-red-500" : "border-gray-300"
                        } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                        placeholder="exemple@domaine.com"
                      />
                      <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
                    </div>
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Mot de passe */}
                  <div>
                    <label
                      htmlFor="mot_de_passe"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      <FaLock className="inline mr-2" /> Mot de passe
                    </label>
                    <div className="relative">
                      <input
                        id="mot_de_passe"
                        name="mot_de_passe"
                        type="password"
                        required
                        onChange={handleChange}
                        value={formData.mot_de_passe}
                        className={`block w-full pl-10 pr-3 py-2 border ${
                          errors.mot_de_passe
                            ? "border-red-500"
                            : "border-gray-300"
                        } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                        placeholder="••••••••"
                      />
                      <FaLock className="absolute left-3 top-3 text-gray-400" />
                    </div>
                    {errors.mot_de_passe && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.mot_de_passe}
                      </p>
                    )}
                  </div>
                </div>

                {/* Column 2 */}
                <div className="space-y-6">
                  {/* Téléphone */}
                  <div>
                    <label
                      htmlFor="telephone"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      <FaPhone className="inline mr-2" /> Téléphone
                    </label>
                    <div className="relative">
                      <input
                        id="telephone"
                        name="telephone"
                        type="tel"
                        required
                        onChange={handleChange}
                        value={formData.telephone}
                        className={`block w-full pl-10 pr-3 py-2 border ${
                          errors.telephone
                            ? "border-red-500"
                            : "border-gray-300"
                        } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                        placeholder="12345678"
                        maxLength="8"
                      />
                      <FaPhone className="absolute left-3 top-3 text-gray-400" />
                    </div>
                    {errors.telephone && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.telephone}
                      </p>
                    )}
                  </div>

                  {/* Adresse */}
                  <div>
                    <label
                      htmlFor="adresse"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      <FaHome className="inline mr-2" /> Adresse
                    </label>
                    <div className="relative">
                      <input
                        id="adresse"
                        name="adresse"
                        type="text"
                        required
                        onChange={handleChange}
                        value={formData.adresse}
                        className={`block w-full pl-10 pr-3 py-2 border ${
                          errors.adresse ? "border-red-500" : "border-gray-300"
                        } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                        placeholder="Votre adresse complète"
                      />
                      <FaHome className="absolute left-3 top-3 text-gray-400" />
                    </div>
                    {errors.adresse && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.adresse}
                      </p>
                    )}
                  </div>

                  {/* CIN */}
                  <div>
                    <label
                      htmlFor="cin"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      <FaIdCard className="inline mr-2" /> CIN
                    </label>
                    <div className="relative">
                      <input
                        id="cin"
                        name="cin"
                        type="text"
                        required
                        onChange={handleChange}
                        value={formData.cin}
                        className={`block w-full pl-10 pr-3 py-2 border ${
                          errors.cin ? "border-red-500" : "border-gray-300"
                        } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                        placeholder="12345678"
                        maxLength="8"
                      />
                      <FaIdCard className="absolute left-3 top-3 text-gray-400" />
                    </div>
                    {errors.cin && (
                      <p className="mt-1 text-sm text-red-600">{errors.cin}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* CV File Input - Full width */}
              <div>
                <label
                  htmlFor="cv"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  <FaFilePdf className="inline mr-2" /> CV (PDF)
                </label>
                <div className="relative">
                  <input
                    id="cv"
                    name="cv"
                    type="file"
                    required
                    accept=".pdf"
                    onChange={(e) => {
                      setCvFile(e.target.files[0]);
                      if (errors.cv) setErrors({ ...errors, cv: "" });
                    }}
                    className={`block w-full pl-10 pr-3 py-2 border ${
                      errors.cv ? "border-red-500" : "border-gray-300"
                    } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                  />
                  <FaFilePdf className="absolute left-3 top-3 text-gray-400" />
                </div>
                {errors.cv && (
                  <p className="mt-1 text-sm text-red-600">{errors.cv}</p>
                )}
                {cvFile && (
                  <p className="mt-1 text-sm text-green-600">
                    Fichier sélectionné: {cvFile.name}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors ${
                    isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <FaSpinner className="animate-spin mr-3" />
                      Traitement en cours...
                    </>
                  ) : (
                    "S'inscrire maintenant"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
