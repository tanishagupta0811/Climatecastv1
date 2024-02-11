import React from 'react';
import Chart from 'react-apexcharts';
import { data } from './data';
import './statewisesummary.css'

const CityPopulationChart = ({ stateName }) => {
  const selectedState = data.find((state) => state.state === stateName);

  if (!selectedState) {
    return <p>Invalid state selected</p>;
  }

  const citiesData = selectedState.cities.map((city) => {
    return {
      name: city.name,
      population: city.population,
    };
  });

  const chartOptions = {
    xaxis: {
      categories: citiesData.map((city) => city.name),
    },
    chart: {
      width: '100%',
      height: '400px',
      type: 'line',
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

  const chartSeries = [
    {
      name: 'Population',
      data: citiesData.map((city) => city.population),
    },
  ];

  return (
    <div className="city-population-chart">
      <div className='chart1'>
        <p>City Population Chart</p>
        <Chart options={chartOptions} series={chartSeries} type="line" />
      </div>
    </div>
  );
};

export default CityPopulationChart;