import React from 'react';
import { useTable } from 'react-table';
import { data } from './data';

const StateDetailsTable = ({ stateName }) => {
  const columns = React.useMemo(
    () => [
      { Header: 'S.No', accessor: (row, index) => index + 1 },
      { Header: 'City Name', accessor: 'name' },
      { Header: 'Population', accessor: 'population' },
      { Header: 'Total Assets', accessor: 'total_assets' },
    ],
    []
  );

  const flattenedData = React.useMemo(() => {
    const flattened = data.reduce((acc, state) => {
      if (state.state === stateName) {
        return acc.concat(
          state.cities.map((city) => ({
            state: state.state,
            name: city.name,
            population: city.population,
            total_assets: city.total_assets,
            'asset_allocation.Mining': city.asset_allocation.Mining,
            'asset_allocation.Education': city.asset_allocation.Education,
          }))
        );
      }
      return acc;
    }, []);
    return flattened;
  }, [data, stateName]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data: flattenedData });

  return (
    <div className='table-div'>
      <table
        {...getTableProps()}
        style={{
          borderCollapse: 'collapse',
          width: '100%',
          margin: '10px', // Add margin
        }}
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr
              {...headerGroup.getHeaderGroupProps()}
              style={{
                background: '#f2f2f2', // Add background color
                color: '#333', // Add text color
              }}
            >
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  style={{
                    padding: '10px', // Add padding
                    borderBottom: '1px solid #ddd', // Add border bottom
                  }}
                >
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, rowIndex) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                style={{
                  background: rowIndex % 2 === 0 ? '#f9f9f9' : '#fff', // Alternating row background color
                }}
              >
                {row.cells.map((cell, cellIndex) => (
                  <td
                    {...cell.getCellProps()}
                    style={{
                      padding: '10px', // Add padding
                      borderBottom: '1px solid #ddd', // Add border bottom
                    }}
                  >
                    {cellIndex > 1
                      ? `${((cell.value / row.cells[3].value) * 100).toFixed(2)}%`
                      : cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default StateDetailsTable;




