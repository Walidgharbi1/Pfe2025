import SidebarCandidat from "../composants/SideBarCandidat";

const StatistiquesCandidat = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <SidebarCandidat />
      <div className="max-w-3xl mx-auto p-6 mt-10 bg-white rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold text-blue-800 mb-6">Mon Profil</h2>
      </div>
    </div>
  );
};

export default StatistiquesCandidat;
