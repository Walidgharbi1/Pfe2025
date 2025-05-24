import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCandidatCV } from "../services/CvServices";
import { resetAuthMessages, updateProfile } from "../../redux/slices/authSlice";
import SidebarCandidat from "../composants/SideBarCandidat";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaHome,
  FaIdCard,
  FaFilePdf,
  FaEdit,
  FaSave,
  FaTimes,
  FaLock,
  FaDownload,
} from "react-icons/fa";
import { toast } from "react-toastify";
const ProfilCandidat = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [cv, setCv] = useState(null);
  const [existingCV, setExistingCV] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [password, setPassword] = useState("");
  const { user, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    setUserData(user);
    getCandidatCV(user._id).then((result) => {
      setExistingCV(result);
    });
  }, [user]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    delete userData.mot_de_passe;
    let formData = new FormData();
    if (cv) {
      formData.append("cv", cv);
    }
    if (password.length > 0) {
      formData.append(
        "userData",
        JSON.stringify({ ...userData, mot_de_passe: password })
      );
    } else {
      formData.append("userData", JSON.stringify(userData));
    }

    dispatch(updateProfile(formData));
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setUserData(user);
    setPassword("");
  };

  const downloadCV = () => {
    if (existingCV) {
      const link = document.createElement("a");
      link.href = `http://localhost:3000/${existingCV.cv_path}`;
      link.download = `CV_${userData.nom}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(resetAuthMessages());
    }
  }, [error]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SidebarCandidat />

      <div className="flex-1 p-6 md:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-white">
              <h1 className="text-2xl md:text-3xl font-bold flex items-center">
                <FaUser className="mr-3" /> Mon Profil
              </h1>
              <p className="mt-1 opacity-90">
                Gérer vos informations personnelles et votre CV
              </p>
            </div>

            {/* Content */}
            <div className="p-6 md:p-8">
              {isEditing ? (
                <form onSubmit={handleSave} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Nom */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                        <FaUser className="mr-2" /> Nom complet
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={userData.nom || ""}
                          onChange={(e) =>
                            setUserData({ ...userData, nom: e.target.value })
                          }
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          required
                        />
                        <FaUser className="absolute left-3 top-3.5 text-gray-400" />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                        <FaEnvelope className="mr-2" /> Email
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          value={userData.email || ""}
                          onChange={(e) =>
                            setUserData({ ...userData, email: e.target.value })
                          }
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          required
                        />
                        <FaEnvelope className="absolute left-3 top-3.5 text-gray-400" />
                      </div>
                    </div>

                    {/* Téléphone */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                        <FaPhone className="mr-2" /> Téléphone
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={userData.telephone || ""}
                          onChange={(e) =>
                            setUserData({
                              ...userData,
                              telephone: e.target.value,
                            })
                          }
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        <FaPhone className="absolute left-3 top-3.5 text-gray-400" />
                      </div>
                    </div>

                    {/* Adresse */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                        <FaHome className="mr-2" /> Adresse
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={userData.adresse || ""}
                          onChange={(e) =>
                            setUserData({
                              ...userData,
                              adresse: e.target.value,
                            })
                          }
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        <FaHome className="absolute left-3 top-3.5 text-gray-400" />
                      </div>
                    </div>

                    {/* CIN */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                        <FaIdCard className="mr-2" /> CIN
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={userData.cin || ""}
                          onChange={(e) =>
                            setUserData({ ...userData, cin: e.target.value })
                          }
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        <FaIdCard className="absolute left-3 top-3.5 text-gray-400" />
                      </div>
                    </div>

                    {/* Mot de passe */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                        <FaLock className="mr-2" /> Nouveau mot de passe
                      </label>
                      <div className="relative">
                        <input
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Laisser vide pour ne pas changer"
                        />
                        <FaLock className="absolute left-3 top-3.5 text-gray-400" />
                      </div>
                    </div>

                    {/* CV Upload */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                        <FaFilePdf className="mr-2" /> CV (PDF)
                      </label>
                      <div className="flex items-center">
                        <input
                          type="file"
                          accept=".pdf"
                          onChange={(e) => setCv(e.target.files[0])}
                          className="block w-full text-sm text-gray-500
                            file:mr-4 file:py-2 file:px-4
                            file:rounded-md file:border-0
                            file:text-sm file:font-semibold
                            file:bg-blue-50 file:text-blue-700
                            hover:file:bg-blue-100"
                        />
                        {existingCV && (
                          <button
                            type="button"
                            onClick={downloadCV}
                            className="ml-4 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            <FaDownload className="mr-2" /> Télécharger
                          </button>
                        )}
                      </div>
                      {existingCV && (
                        <p className="mt-2 text-sm text-gray-500">
                          CV actuel: {existingCV.cv_path.split("/").pop()}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <FaTimes className="mr-2" /> Annuler
                    </button>
                    <button
                      type="submit"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <FaSave className="mr-2" /> Enregistrer
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-6">
                  {/* Profile Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                        <FaUser className="mr-2 text-blue-600" /> Informations
                        personnelles
                      </h3>
                      <dl className="space-y-3">
                        <div className="sm:grid sm:grid-cols-3 sm:gap-4">
                          <dt className="text-sm font-medium text-gray-500">
                            Nom complet
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                            {user.nom}
                          </dd>
                        </div>
                        <div className="sm:grid sm:grid-cols-3 sm:gap-4">
                          <dt className="text-sm font-medium text-gray-500">
                            Email
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                            {user.email}
                          </dd>
                        </div>
                        <div className="sm:grid sm:grid-cols-3 sm:gap-4">
                          <dt className="text-sm font-medium text-gray-500">
                            Téléphone
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                            {user.telephone || "Non renseigné"}
                          </dd>
                        </div>
                        <div className="sm:grid sm:grid-cols-3 sm:gap-4">
                          <dt className="text-sm font-medium text-gray-500">
                            Adresse
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                            {user.adresse || "Non renseignée"}
                          </dd>
                        </div>
                        <div className="sm:grid sm:grid-cols-3 sm:gap-4">
                          <dt className="text-sm font-medium text-gray-500">
                            CIN
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                            {user.cin || "Non renseigné"}
                          </dd>
                        </div>
                      </dl>
                    </div>

                    {/* CV Section */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                        <FaFilePdf className="mr-2 text-blue-600" /> Mon CV
                      </h3>
                      {existingCV ? (
                        <div className="space-y-4">
                          <div className="flex items-center">
                            <FaFilePdf className="text-red-500 text-2xl mr-3" />
                            <div>
                              <p className="text-sm font-medium text-gray-900">
                                {existingCV.cv_path.split("/").pop()}
                              </p>
                              <button
                                onClick={downloadCV}
                                className="mt-1 inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
                              >
                                <FaDownload className="mr-1" /> Télécharger
                              </button>
                            </div>
                          </div>
                          <iframe
                            src={`http://localhost:3000/${existingCV.cv_path}`}
                            className="w-full h-64 border border-gray-200 rounded-md"
                            title="Mon CV"
                          />
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <FaFilePdf className="mx-auto text-gray-400 text-4xl mb-2" />
                          <p className="text-sm text-gray-500">
                            Aucun CV enregistré
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Edit Button */}
                  <div className="flex justify-end pt-4 border-t border-gray-200">
                    <button
                      onClick={handleEdit}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <FaEdit className="mr-2" /> Modifier mon profil
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilCandidat;
