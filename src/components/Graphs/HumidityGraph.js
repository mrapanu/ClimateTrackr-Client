import React from "react";
import {
  CartesianGrid,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Legend,
  AreaChart,
} from "recharts";

const HumidityGraph = ({ data }) => {
  const transformedData = data.map((entry) => ({
    ...entry,
    date: new Date(entry.date).toLocaleTimeString([], {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23"
    }),
  }));

  return (
    <div>
      <div className="chart-title">Humidity Chart</div>
      <ResponsiveContainer
        width="100%"
        height={window.innerWidth < 600 ? 220 : 270}
      >
        <AreaChart data={transformedData}>
          <XAxis dataKey="date" />
          <YAxis dataKey="humidity" domain={[0,100]}/>
          <Tooltip />
          <Legend />
          <CartesianGrid strokeDasharray="2 2" />
          <Area
            type="monotone"
            dataKey="humidity"
            stroke="#4ad4f7"
            fill="#4ad4f7"
            fillOpacity={0.4}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HumidityGraph;
