import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { useEffect, useState } from "react";

// Function to format date to French month
const formatMonth = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleString("fr-FR", { month: "long" }); // e.g., "janvier"
};

const ChartComponent = ({ candidatures }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const monthCounts = {};

    candidatures.forEach((item) => {
      const month = formatMonth(item.created_at);

      if (monthCounts[month]) {
        monthCounts[month]++;
      } else {
        monthCounts[month] = 1;
      }
    });

    // Convert to array and ensure proper order
    const monthsOrder = [
      "janvier",
      "février",
      "mars",
      "avril",
      "mai",
      "juin",
      "juillet",
      "août",
      "septembre",
      "octobre",
      "novembre",
      "décembre",
    ];

    const result = monthsOrder.map((month) => ({
      mois: month,
      total: monthCounts[month] || 0,
    }));

    setChartData(result);
  }, [candidatures]);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData}>
        <XAxis dataKey="mois" stroke="#8884d8" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Bar dataKey="total" fill="#6366F1" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ChartComponent;
