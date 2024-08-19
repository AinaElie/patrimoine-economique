import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Legend, Title } from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Legend, Title);

const LineChart = () => {
  const data = {
    labels: ["Jan", "Fev", "Mar", "Avr", "Mai", "Jui"],
    datasets: [
      {
        label: 'Patrimoine',
        data: [0, 40, 45, 60, 80, 10],
        fill: false,
        borderColor: 'green',
        tension: 0.1,
      }
    ]
  }

  return (
    <div className='p-8'>
      <div className='border w-10/12 h-96 flex justify-center items-center'>
        <Line data={data} className='w-full' />
      </div>
    </div>
  );
};

export default LineChart;
