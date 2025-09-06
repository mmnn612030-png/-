
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

interface ChartData {
  name: string;
  'حصص مشغولة': number;
  'النسبة المئوية': number;
}

interface OccupancyChartProps {
  data: ChartData[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-300 rounded-lg shadow-lg">
        <p className="font-bold text-gray-800">{`${label}`}</p>
        <p className="text-blue-600">{`حصص مشغولة: ${payload[0].value}`}</p>
        <p className="text-green-600">{`النسبة: ${payload[1].value}%`}</p>
      </div>
    );
  }
  return null;
};

const OccupancyChart: React.FC<OccupancyChartProps> = ({ data }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg h-96">
      <h2 className="text-2xl font-bold text-gray-700 mb-6 text-center">نسبة إشغال المعامل</h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 5, right: 20, left: 0, bottom: 25 }}
          dir="rtl"
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} interval={0} />
          <YAxis yAxisId="left" orientation="right" label={{ value: 'عدد الحصص', angle: -90, position: 'insideRight', offset: 10 }} />
          <YAxis yAxisId="right" orientation="left" label={{ value: 'النسبة المئوية (%)', angle: 90, position: 'insideLeft', offset: 10 }} />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{direction: 'rtl', paddingTop: '20px'}} />
          <Bar yAxisId="left" dataKey="حصص مشغولة" fill="#3B82F6">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
          <Bar yAxisId="right" dataKey="النسبة المئوية" fill="#10B981" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default OccupancyChart;
