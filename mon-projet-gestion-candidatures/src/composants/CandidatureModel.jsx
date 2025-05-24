import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/slices/authSlice";
import { toast } from "react-toastify";
import { getCandidatCV } from "../services/CvServices";
import { handleCreateCandidature } from "../services/CandidatureServices";

export default function CandidatureModal({ isOpen, onClose, offre_id }) {
  const [newCv, setNewCv] = useState(null);
  const [newCvUrl, setNewCvUrl] = useState("");

  const [cvPath, setCvPath] = useState("");

  const { user } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();

    let formData = new FormData();

    if (newCv != null) {
      formData.append("cv", newCv);
      formData.append("user_id", user._id);
      formData.append("cv_path", null);
      formData.append("offre_id", offre_id);
    } else {
      formData.append("user_id", user._id);
      formData.append("cv_path", cvPath);
      formData.append("cv", null);
      formData.append("offre_id", offre_id);
    }
    console.log("jgjsgdjkjaqgkjqsh");
    handleCreateCandidature(formData); // Save the offer (either create or update)
    onClose(); // Close the modal after saving
    toast.success(`Candidature envoyé ! `);
  };

  useEffect(() => {
    getCandidatCV(user._id).then((cv) => {
      setCvPath(cv.cv_path);
    });
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setNewCv(file);
    const fileUrl = URL.createObjectURL(file);
    setNewCvUrl(fileUrl);
  };

  return (
    isOpen && (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-100 to-white">
        <form onSubmit={handleSubmit} className="space-y-5">
          {" "}
          <div className="bg-white shadow-xl p-8 rounded-2xl w-full max-w-md">
            <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
              choisir votre cv et valider :
            </h2>

            <h6>votre cv actuel </h6>
            {newCvUrl.length == 0 && (
              <iframe src={`http://localhost:3000/${cvPath}`}></iframe>
            )}

            <label>ou bien choisir un autre cv</label>
            <input type="file" name="" id="" onChange={handleFileChange} />
            {newCvUrl.length > 0 && <iframe src={newCvUrl}></iframe>}
          </div>
          <button
            type="submit"
            className="bg-blue-600 px-2 py-4 rounded-lg text-white"
          >
            postuler{" "}
          </button>{" "}
        </form>
      </div>
    )
  );
}
