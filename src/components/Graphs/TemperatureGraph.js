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
      hourCycle: "h23"
    }),
  }));
  const maxTemperature = Math.max(...transformedData.map(entry => entry.temperature));
  const upperBound = Math.ceil(maxTemperature * 1.25 / 10) * 10;

  const ticks = [];
  for(let i = 0 ; i <= Math.round(upperBound/5); i++)
  {
    ticks.push(i*5);
  }

  return (
    <div>
      <div className="chart-title">Temperature Chart</div>
      <ResponsiveContainer
        width="100%"
        height={window.innerWidth < 600 ? 220 : 270}
      >
        <AreaChart data={transformedData}>
          <XAxis dataKey="date" />
          <YAxis dataKey="temperature" domain={[0, upperBound]} ticks={ticks}/>
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
