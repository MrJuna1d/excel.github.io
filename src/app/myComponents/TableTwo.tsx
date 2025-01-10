import React from "react";

interface TableTwoProps {
  numericalData: number[];
}

const TableTwo: React.FC<TableTwoProps> = ({ numericalData }) => {
  if (numericalData.length < 20) {
    return (
      <p className="mt-4 text-red-500">Not enough data to calculate Table 2.</p>
    );
  }

  const alpha = numericalData[4] + numericalData[19];
  const beta = numericalData[14] / (numericalData[6] || 1);
  const charlie = numericalData[12] * numericalData[11];

  return (
    <div className="mt-8 w-full max-w-md">
      <h2 className="text-lg font-bold mb-4">Table 2</h2>
      <table className="table-auto border-collapse border border-gray-300 w-full">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border border-gray-300">
              Category
            </th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border border-gray-300">
              Value
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white">
            <td className="px-4 py-2 text-sm text-gray-600 border border-gray-300">
              Alpha
            </td>
            <td className="px-4 py-2 text-sm text-gray-600 border border-gray-300">
              {alpha}
            </td>
          </tr>
          <tr className="bg-gray-50">
            <td className="px-4 py-2 text-sm text-gray-600 border border-gray-300">
              Beta
            </td>
            <td className="px-4 py-2 text-sm text-gray-600 border border-gray-300">
              {beta.toFixed(2)}
            </td>
          </tr>
          <tr className="bg-white">
            <td className="px-4 py-2 text-sm text-gray-600 border border-gray-300">
              Charlie
            </td>
            <td className="px-4 py-2 text-sm text-gray-600 border border-gray-300">
              {charlie}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TableTwo;
