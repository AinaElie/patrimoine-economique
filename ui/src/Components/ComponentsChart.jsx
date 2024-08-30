import React, { useEffect, useRef } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend} from 'chart.js';
import Chart from 'chart.js/auto';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function MyChartComponent({ data, options }) {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
      const ctx = chartRef.current.getContext('2d');

      if (chartInstanceRef.current) {
          chartInstanceRef.current.destroy();
      }

      chartInstanceRef.current = new Chart(ctx, {
          type: 'line',
          data: data,
          options: options,
      });

      return () => {
          if (chartInstanceRef.current) {
              chartInstanceRef.current.destroy();
          }
      };
  }, [data, options]);

  return <canvas ref={chartRef}></canvas>;
}

const LineChart = ({value}) => {
  const chartData = {
    labels: value.mois,
    datasets: [
      {
        label: 'Value',
        data: value.valeurPatrimoine,
        fill: false,
        borderColor: 'green',
        tension: 0.1,
      }
    ]
  }

  return <MyChartComponent data={chartData}/>;
};

export default LineChart;
