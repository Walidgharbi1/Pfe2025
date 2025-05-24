import React from "react";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";

const COLORS = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"]; // More visually distinct colors

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  name,
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos((-midAngle * Math.PI) / 180);
  const y = cy + radius * Math.sin((-midAngle * Math.PI) / 180);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      fontSize={12}
      fontWeight="bold"
    >
      {`${name}: ${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function PieChartGraph({ candidatures }) {
  const statusCounts = candidatures.reduce((acc, el) => {
    const status = el.status === "interview scheduled" ? "accepted" : el.status;
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});

  const data = [
    { name: "Refusé", value: statusCounts["refusé"] || 0 },
    { name: "En attente", value: statusCounts["en_attente"] || 0 },
    { name: "Accepté", value: statusCounts["accepted"] || 0 },
  ].filter((item) => item.value > 0);

  if (data.length === 0) {
    return (
      <div
        style={{
          width: 400,
          height: 400,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <p>Aucune donnée disponible</p>
      </div>
    );
  }

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h3 style={{ marginBottom: 20 }}>Statut des Candidatures</h3>
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={120}
          innerRadius={60}
          paddingAngle={5}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value, name) => [`${value} candidatures`, name]} />
        <Legend
          layout="horizontal"
          verticalAlign="bottom"
          align="center"
          formatter={(value) => <span style={{ color: "#333" }}>{value}</span>}
        />
      </PieChart>
    </div>
  );
}
