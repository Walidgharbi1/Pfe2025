import { useEffect, useState } from "react";
import { Card, CardContent } from "../../composants/Card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Sidebar from "../../composants/SideBar";
import { fetchOffres } from "../../services/OffreServices";
import { getAllCandidatures } from "../../services/CandidatureServices";
import { fetchCandidats } from "../../services/AdminServices";
import ChartComponent from "../../composants/ChartComponent";
import PieChartGraph from "../../composants/PieChart";
import ChefRSidebar from "../../composants/ChefRSidebar";
export default function ChefRDashboard() {
  const [stats, setStats] = useState({
    candidats: 0,
    offres: 0,
    candidatures: 0,
  });

  const [candidatures, setCandidatures] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const [offres, candidatures, candidats] = await Promise.all([
        fetchOffres(),
        getAllCandidatures(),
        fetchCandidats(),
      ]);

      setStats({
        offres: offres.length,
        candidatures: candidatures.length,
        candidats: candidats.length,
      });
    };

    fetchData();
  }, []);

  useEffect(() => {
    getAllCandidatures().then((result) => {
      setCandidatures(result);
    });
  }, []);

  return (
    <div className="flex">
      <ChefRSidebar />
      <div className="flex-1 p-6 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Tableau de bord
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <Card className="bg-white shadow-md rounded-2xl p-4">
            <CardContent>
              <p className="text-gray-500">Candidats</p>
              <h2 className="text-2xl font-semibold">{stats.candidats}</h2>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-md rounded-2xl p-4">
            <CardContent>
              <p className="text-gray-500">Offres</p>
              <h2 className="text-2xl font-semibold">{stats.offres}</h2>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-md rounded-2xl p-4">
            <CardContent>
              <p className="text-gray-500">Candidatures</p>
              <h2 className="text-2xl font-semibold">{stats.candidatures}</h2>
            </CardContent>
          </Card>
        </div>

        <div className="bg-white shadow-md rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Candidatures par mois
          </h2>
          <ChartComponent candidatures={candidatures} />
        </div>

        <div className="bg-white shadow-md rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Candidatures par mois
          </h2>
          <PieChartGraph candidatures={candidatures} />
        </div>
      </div>
    </div>
  );
}
