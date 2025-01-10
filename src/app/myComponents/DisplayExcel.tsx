import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import TableTwo from "./TableTwo";

interface CSVRow {
  [key: string]: string; // Represents a key-value pair for each row in the CSV
}

function DisplayExcel() {
  const [tableRows, setTableRows] = useState<string[]>([]);
  const [values, setValues] = useState<string[][]>([]);
  const [numericalData, setNumericalData] = useState<number[]>([]);

  // Function to fetch and parse the preloaded CSV file
  const preloadCSV = async () => {
    try {
      const response = await fetch("/Table_Input.csv"); // Fetch the file from the public directory
      if (!response.ok) {
        throw new Error("Failed to fetch the CSV file.");
      }
      const csvText = await response.text();
      Papa.parse<CSVRow>(csvText, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          if (results.errors.length) {
            console.error("Errors while parsing CSV:", results.errors);
            return;
          }
          if (results.data.length === 0) {
            console.warn("The CSV file is empty or invalid.");
            return;
          }

          const rowsArray = Object.keys(results.data[0]);
          const valuesArray = results.data.map((row) => Object.values(row));
          const flattenedData = results.data.flatMap((row) =>
            Object.values(row).map((value) => parseFloat(value) || 0)
          );

          setTableRows(rowsArray);
          setValues(valuesArray);
          setNumericalData(flattenedData);
        },
      });
    } catch (error) {
      console.error("Error loading the preloaded CSV file:", error);
    }
  };

  // Fetch and parse the CSV when the component mounts
  useEffect(() => {
    preloadCSV();
  }, []);

  return (
    <div className="flex flex-col items-center p-4">
      {/* Table */}
      {tableRows.length > 0 && (
        <div className="overflow-x-auto w-full">
          <table className="table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                {tableRows.map((columnName, index) => (
                  <th
                    key={index}
                    className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border border-gray-300"
                  >
                    {columnName}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {values.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className={rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  {row.map((cell, cellIndex) => (
                    <td
                      key={cellIndex}
                      className="px-4 py-2 text-sm text-gray-600 border border-gray-300"
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pass numericalData to TableTwo */}
      <TableTwo numericalData={numericalData} />
    </div>
  );
}

export default DisplayExcel;
