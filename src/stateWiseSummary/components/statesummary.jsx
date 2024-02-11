// TreemapChart.js
import React, {useState} from 'react';
import { Treemap, Tooltip, ResponsiveContainer } from 'recharts';
import './statewisesummary.css'
import StateDetailComponent from './StateDetailComponent'; // Import the new component
import StateDetailsTable from './StateDetailsTable';
import Nav from "../Nav/Nav"


  

const data =  [
    { x: "Karnataka", value: 35, name: "Karnataka", temp: 28, population: 12.726 },
    { x: "Tamil Nadu", value: 28, name: "Tamil Nadu", temp: 30, population: 9.11 },
    { x: "Telangana", value: 25, name: "Telangana", temp: 32, population: 9.47 },
    { x: "Rajasthan", value: 19, name: "Rajasthan", temp: 25, population: 3.1 },
    { x: "Uttar Pradesh", value: 20, name: "Uttar Pradesh", temp: 28, population: 3.2 },
    { x: "West Bengal", value: 23, name: "West Bengal", temp: 29, population: 14.8 },
    { x: "Maharashtra", value: 36, name: "Maharashtra", temp: 27, population: 20.5 },
    { x: "Punjab", value: 18, name: "Punjab", temp: 20, population: 1.5 },
    { x: "Gujarat", value: 24, name: "Gujarat", temp: 31, population: 4.9 },
    { x: "Haryana", value: 26, name: "Haryana", temp: 25, population: 2.9 },
    { x: "Madhya Pradesh", value: 23, name: "Madhya Pradesh", temp: 27, population: 7.5 },
];

const TreemapChart = () => {
  const [selectedState, setSelectedState] = useState(null);

  const handleStateClick = (name) => {
    setSelectedState(name);
  };


  return (
   <div>
      {/* <div className='header'>StateWise Summary</div> */}
      <Nav/>
      <div className='center-container'>
        <ResponsiveContainer width="90%" height={400}>
          <Treemap
            width={400}
            height={200}
            data={data}
            dataKey="value"
            ratio={4 / 3}
            stroke="#fff"
            fill="#8884d8"
            content={<CustomizedContent onStateClick={handleStateClick} />}
          >
            <Tooltip content={<CustomTooltip />} />
          </Treemap>
        </ResponsiveContainer>
      </div>
      
      {selectedState && <StateDetailComponent stateName={selectedState} />}
      {selectedState && <StateDetailsTable stateName={selectedState} />}

      {/* <div className='footer'>Made By Khusbu Gupta</div> */}
 </div>
    
  );
};

const CustomizedContent = ({ root, depth, x, y, width, height, index, payload, colors, rank, name, temp, onStateClick }) => {
  const temperatureRange = [20, 32]; // Adjust the temperature range as needed
  const color = getColor(temp, temperatureRange);

  const handleClick = () => {
    onStateClick(name);
  };

  return (
    <g onClick={handleClick} style={{ cursor: 'pointer' }} >
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={color}
        stroke="#fff"
        strokeWidth={2}
      />
      {depth === 1 ? (
        <text
          x={x + width / 2}
          y={y + height / 2 + 7}
          textAnchor="middle"
          fill="#fff"
          fontSize={12}
        >
          {name}
        </text>
      ) : null}
    </g>
  );
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div style={{ background: '#fff', padding: '10px', border: '1px solid #ccc', fontSize:"10px" }}>
        <p>{`State: ${data.name}`}</p>
        <p>{`Temperature: ${data.temp}`}</p>
        <p>{`Population: ${data.population}`}</p>
      </div>
    );
  }

  return null;
};

const getColor = (temperature, range) => {
  const minTemp = range[0];
  const maxTemp = range[1];

  if (typeof temperature !== 'number' || isNaN(temperature)) {
    console.log("Invalid temperature value:", temperature);
    return 'rgb(0, 0, 0)'; // Return a default color if temperature is invalid
  }
  const normalizedTemp = Math.min(maxTemp, Math.max(minTemp, temperature));
  const ratio = (normalizedTemp - minTemp) / (maxTemp - minTemp);
  const blue = Math.round(255 * (1 - ratio));
  const red = Math.round(255 * ratio);
  console.log("Red:", red, "Blue:", blue);


  return `rgb(${red}, 0, ${blue})`;
};

export default TreemapChart;

