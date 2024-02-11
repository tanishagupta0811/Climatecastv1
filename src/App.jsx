import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Router, Routes, Route, Link } from "react-router-dom";
import './App.css';
import TreeMapChart from '../src/stateWiseSummary/components/statesummary';
import search from './assets/icons/search.svg';
import { useStateContext } from './Context';
import { BackgroundLayout, WeatherCard, MiniCard } from './Components';
import Home from './Home';

function App() {
  const [input, setInput] = useState('');
  const [searchHistory, setSearchHistory] = useState([]);
  const { weather, thisLocation, values, place, setPlace } = useStateContext();
  const [filteredHistory, setFilteredHistory] = useState([]);
  const searchContainerRef = useRef(null);

  useEffect(() => {
    const storedHistory = localStorage.getItem('searchHistory');
    if (storedHistory) {
      setSearchHistory(JSON.parse(storedHistory));
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setFilteredHistory([]);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [searchContainerRef]);

  const submitCity = () => {
    if (input.trim() !== '') {
      setPlace(input);
      setInput('');

      const updatedHistory = [input, ...searchHistory.slice(0, 4)];
      setSearchHistory(updatedHistory);

      localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
    }
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setInput(inputValue);

    if (e.key === 'Enter') {
      e.preventDefault(); 
      submitCity();
    } else {
      const filtered = searchHistory.filter(item =>
        item.toLowerCase().includes(inputValue.toLowerCase())
      );
      setFilteredHistory(filtered);
    }
  };

  const handleSearchHistoryClick = (historyItem) => {
    setPlace(historyItem);
    setInput(historyItem);
    setFilteredHistory([]);
  };

  return (
    <BrowserRouter>
    <div className='w-full h-screen text-black px-8 z-10'>
      
      {/* <NavBar/> */}
      <Routes>
       <Route exact path="/state" element={<TreeMapChart />} /> 
       <Route exact path="/" element={<Home />} /> 

      </Routes>
      {/* <div className='relative z-10' ref={searchContainerRef}>
          <div className='bg-white overflow-hidden shadow-2xl rounded flex items-center p-2 gap-2'>
            <img src={search} alt="search" className='w-[1.5rem] h-[1.5rem] z-10' />
            <input
              type="text"
              placeholder='Search for any city..'
              className='focus:outline-none ring-2 rounded-lg p-1 w-full text-[#341212] text-lg '
              value={input}
              onChange={handleInputChange}
              onKeyUp={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  submitCity();
                }
              }}
            />
          </div>
          {filteredHistory.length > 0 && (
            <div className='absolute top-full  p-6 bg-gray-100 w-[260px] rounded-b-md  mr-1right-0 text-gray-500'>
              <strong>Search History:</strong>
              <ul>
                {filteredHistory.map((item, index) => (
                  <li key={index} onClick={() => handleSearchHistoryClick(item)} className='cursor-pointer hover:underline'>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      <BackgroundLayout></BackgroundLayout>
      <main className='w-full flex flex-wrap gap-8 py-4 px-[10%] items-center justify-center'>
        <WeatherCard
          place={thisLocation}
          windspeed={weather.wspd}
          humidity={weather.humidity}
          temperature={weather.temp}
          heatIndex={weather.heatindex}
          iconString={weather.conditions}
          conditions={weather.conditions}
        />

        <div className='flex justify-center gap-8 flex-wrap w-[60%]'>
          {values?.slice(1, 7).map(curr => (
            <MiniCard
              key={curr.datetime}
              time={curr.datetime}
              temp={curr.temp}
              iconString={curr.conditions}
            />
          ))}
        </div>
      </main> */}
    </div>
    </BrowserRouter>
  );
}

export default App;

// import { useState, useEffect } from 'react';
// import './App.css';
// import search from './assets/icons/search.svg';
// import { useStateContext } from './Context';
// import { BackgroundLayout, WeatherCard } from './Components';

// import Chart from 'chart.js/auto';

// function App() {
//   const [input, setInput] = useState('');
//   const { weather, thisLocation, values, place, setPlace } = useStateContext();
//   const [recentSearches, setRecentSearches] = useState(() => {
//     const storedSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];
//     return storedSearches;
//   });

//   const submitCity = () => {
//     const newPlace = input.trim();
//     if (newPlace) {
//       setPlace(newPlace);
//       setInput('');
//       updateRecentSearches(newPlace);
//     }
//   };

//   const updateRecentSearches = (newPlace) => {
//     setRecentSearches(prevSearches => {
//       const updatedSearches = [newPlace, ...prevSearches.filter(search => search !== newPlace).slice(0, 4)];
//       return updatedSearches;
//     });
//   };

//   useEffect(() => {
//     localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
//   }, [recentSearches]);

//   useEffect(() => {
//     const today = new Date().getDay();
//     const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

//     const pastDaysLabels = [];
//     for (let i = today - 1; i >= 0; i--) {
//       pastDaysLabels.push(daysOfWeek[i]);
//     }

//     for (let i = 6; i > today; i--) {
//       pastDaysLabels.push(daysOfWeek[i]);
//     }

//     if (values) {
//       const ctx = document.getElementById('weatherChart');
//       const data = values.slice(1, 8).map(curr => curr.temp);
//       const conditions = values.slice(1, 8).map(curr => curr.conditions);

//       const myChart = new Chart(ctx, {
//         type: 'line',
//         data: {
//           labels: pastDaysLabels.reverse(),
//           datasets: [{
//             label: 'Temperature (°C)',
//             data: data,
//             fill: false,
//             borderColor: 'rgb(75, 192, 192)',
//             tension: 0.1
//           }]
//         },
//         options: {
//           scales: {
//             y: {
//               beginAtZero: false,
//               ticks: {
//                 color: 'green'
//               }
//             },
//             x: {
//               grid: {
//                 color: 'rgba(100, 100, 100, 0.5)'
//               },
//               ticks: {
//                 color: 'yellow'
//               }
//             }
//           },
//           plugins: {
//             tooltip: {
//               callbacks: {
//                 label: function (context) {
//                   let label = 'Temperature: ';
//                   if (context.parsed.y !== null) {
//                     label += context.parsed.y.toFixed(2) + '°C';
//                   }
//                   if (conditions[context.dataIndex]) {
//                     label += ' - ' + conditions[context.dataIndex];
//                   }
//                   return label;
//                 }
//               }
//             }
//           },
//           elements: {
//             line: {
//               backgroundColor: 'rgba(75, 192, 192, 0.2)',
//             },
//             point: {
//               backgroundColor: 'rgba(75, 192, 192, 1)',
//             },
//           },
//           layout: {
//             padding: 20
//           }
//         }
//       });

//       return () => {
//         myChart.destroy();
//       };
//     }
//   }, [values]);

//   return (
//     <div className='w-full h-screen text-black px-8'>
//       <nav className='w-full p-3 flex justify-between items-center'>
//         {/* <img src={logo} alt="Logo" style={{ width: '70px', height: 'auto' }} /> */}
//         <div className='flex justify-center items-center flex-grow'>
//           <div className='bg-white w-[15rem] overflow-hidden shadow-2xl rounded flex items-center p-2 gap-2'>
//             <img src={search} alt="search" className='w-[2.5rem] h-[1.5rem]' />
//             <input
//               onKeyUp={(e) => {
//                 if (e.key === 'Enter') {
//                   submitCity();
//                 }
//               }}
//               type="text"
//               placeholder='Search city'
//               className='focus:outline-none w-full text-[#212121] text-lg'
//               value={input}
//               onChange={e => setInput(e.target.value)}
//             />
//           </div>
//         </div>
//       </nav>

//       <BackgroundLayout />
//       <main className='w-full flex flex-wrap gap-8 py-4 px-[10%] items-center justify-center'>
//         <WeatherCard
//           place={thisLocation}
//           windspeed={weather.wspd}
//           humidity={weather.humidity}
//           temperature={weather.temp}
//           heatIndex={weather.heatindex}
//           iconString={weather.conditions}
//           conditions={weather.conditions}
//           recentSearches={recentSearches}
//         />
//         <div className='w-full lg:w-[60%]'>
//           <canvas id="weatherChart" width="400" height="400"></canvas>
//         </div>
//       </main>
//       <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
//         © 2024 Copyright:
//         <a className='text-reset fw-bold font-bold' href='https://mdbootstrap.com/'>
//           Shravan Das
//         </a>
//       </div>
//     </div>
//   );
// }

// export default App;
