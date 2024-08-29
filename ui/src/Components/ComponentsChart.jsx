import { useEffect, useRef } from 'react';
import { Chart } from 'chart.js';

const ComponentsChart = () => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      // Détruire l'instance existante si elle existe
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      // Créer une nouvelle instance de graphique
      chartInstanceRef.current = new Chart(chartRef.current, {
        type: 'line',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
          datasets: [
            {
              label: 'My First dataset',
              backgroundColor: 'rgba(75,192,192,0.2)',
              borderColor: 'rgba(75,192,192,1)',
              data: [65, 59, 80, 81, 56, 55, 40],
            },
          ],
        },
        options: {
          responsive: true,
          title: {
            display: true,
            text: 'Chart.js Line Chart',
          },
        },
      });
    }

    // Nettoyage à la destruction du composant
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, []);

  return <canvas ref={chartRef} />;
};

export default ComponentsChart;
