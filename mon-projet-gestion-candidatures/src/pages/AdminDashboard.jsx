import { useEffect, useState } from "react";
import { Card, CardContent } from "../composants/Card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import Sidebar from "../composants/SideBar";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    candidats: 0,
    offres: 0,
    candidatures: 0,
  });
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/admin/stats")
      .then((res) => res.json())
      .then((data) => setStats(data));

    fetch("http://localhost:3000/admin/stats/candidatures-par-mois")
      .then((res) => res.json())
      .then((data) => setChartData(data));
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Tableau de bord</h1>

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
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Candidatures par mois</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <XAxis dataKey="mois" stroke="#8884d8" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="total" fill="#6366F1" radius={[4, 4, 0, 0]} />
            </BarChart>
         
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
