import React from "react";
import {
  AreaChart,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Legend,
  CartesianGrid,
  Area,
} from "recharts";

const TemperatureGraph = ({ data }) => {
  const transformedData = data.map((entry) => ({
    ...entry,
    date: new Date(entry.date).toLocaleTimeString([], {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }),
  }));

  return (
    <div>
      <h2>Temperature Chart</h2>
      <ResponsiveContainer width="100%" height={270}>
        <AreaChart data={transformedData}>
          <XAxis dataKey="date" />
          <YAxis dataKey="temperature" />
          <Tooltip />
          <Legend />
          <CartesianGrid strokeDasharray="2 2" />
          <Area
            type="monotone"
            dataKey="temperature"
            stroke="#f39c56"
            fill="#f39c56"
            fillOpacity={0.4}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TemperatureGraph;
