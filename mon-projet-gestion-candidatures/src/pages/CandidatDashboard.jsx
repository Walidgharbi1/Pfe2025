import { useEffect, useState } from "react";
import { Card, CardContent } from "../composants/Card";
import ChartComponent from "../composants/ChartComponent";
import PieChartGraph from "../composants/PieChart";
import { getAllCandidatures } from "../services/CandidatureServices";
import SidebarCandidat from "../composants/SideBarCandidat";
import { fetchOffres } from "../services/OffreServices";
import { fetchCandidats } from "../services/AdminServices";
import { useSelector } from "react-redux";

export default function AdminDashboard() {
  const [nbCandidatures, setNbCandidatures] = useState(0);
  const [candidatures, setCandidatures] = useState([]);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getAllCandidatures();
        const userCandidatures = result.filter(
          (el) => el.user_id._id === user._id
        );
        setNbCandidatures(userCandidatures.length);
        setCandidatures(userCandidatures);
      } catch (error) {
        console.error("Error fetching candidatures:", error);
      }
    };

    fetchData();
  }, [user._id]); // Added dependency

  return (
    <div className="flex">
      <SidebarCandidat />
      <div className="flex-1 p-6 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Tableau de bord
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <Card className="bg-white shadow-md rounded-2xl p-4">
            <CardContent>
              <p className="text-gray-500">Candidatures</p>
              <h2 className="text-2xl font-semibold">{nbCandidatures}</h2>
            </CardContent>
          </Card>
          <div className="grid-col-4 md:grid-cols-3 gap-4 mb-10 bg-white shadow-md rounded-2xl p-6 mt-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              Status des candidatures
            </h2>
            <PieChartGraph candidatures={candidatures} />
          </div>
        </div>
      </div>
    </div>
  );
}
