import React from 'react';
import Chart from 'react-apexcharts';
import { data } from './data';
import './statewisesummary.css'
import CityPopulationChart from './CityPopulationChart';

const StateDetailComponent = ({ stateName }) => {
  const selectedState = data.find((state) => state.state === stateName);

  if (!selectedState) {
    return <p>Invalid state selected</p>;
  }

  const citiesData = selectedState.cities.map((city) => {
    const percentage = (city.total_assets / 100000000) * 100;
    return {
      name: city.name,
      data: percentage,
    };
  });

  const chartOptions = {
    labels: citiesData.map((city) => city.name),
    colors: [
      '#FF6363',
      '#36A2EB',
      '#FFCE56',
      '#48A0D4',
      '#9966FF',
    ],
    chart: {
      width: '100%',
      height: '400px', 
      type: 'donut',
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: '100%',
            height: '300px',
          },
        },
      },
    ],
  };

  const chartSeries = citiesData.map((city) => city.data);

  return (
    <>
      <h2>{stateName}</h2>
      <div className="state-detail-component">
      
      <div className='chart'>
      <p>Total Asset Allocation</p>
      <Chart options={chartOptions} series={chartSeries} type="donut" />
      </div>

      <CityPopulationChart stateName={stateName}/>
      
      </div>
    </>
    
  );
};

export default StateDetailComponent;

