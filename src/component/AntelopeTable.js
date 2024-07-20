import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DataTable from "react-data-table-component";

const customStyles = {
  headRow: {
    style: {
      backgroundColor: "#007BFF",
      color: "white",
    },
  },
  headCells: {
    style: {
      fontSize: "16px",
      fontWeight: "600",
      textTransform: "uppercase",
    },
  },
  cells: {
    style: {
      fontSize: "15px",
      padding: "8px",
      borderBottom: "1px solid #ddd",
    },
  },
  rows: {
    highlightOnHoverStyle: {
      backgroundColor: "#f1f1f1",
      cursor: "pointer",
    },
  },
};

const useFetchAntelopes = () => {
  const [records, setRecords] = useState([]);
  const [filterRecords, setFilterRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get("http://localhost:4000/antelopes");
        setRecords(res.data);
        setFilterRecords(res.data);
      } catch (err) {
        setError(err.message);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  return {
    records,
    filterRecords,
    loading,
    error,
    setRecords,
  };
};

function ShowDataInTable() {
  const navigate1 = useNavigate();
  const navigate2 = useNavigate();
  const { records, filterRecords, loading, error, setRecords } =
    useFetchAntelopes();
  const [searchTerm, setSearchTerm] = useState("");

  const handleFilter = (event) => {
    const { value } = event.target;
    setSearchTerm(value);
    const newData = filterRecords.filter((row) =>
      row.name.toLowerCase().includes(value.toLowerCase())
    );
    setRecords(newData);
  };

  const clearSearch = () => {
    setSearchTerm("");
    setRecords(filterRecords);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Continent",
      selector: (row) => row.continent,
      sortable: true,
    },
    {
      name: "Weight",
      selector: (row) => row.weight,
    },
    {
      name: "Height",
      selector: (row) => row.height,
    },
    {
      name: "Horns",
      selector: (row) => row.horns,
    },
    {
      name: "Picture",
      selector: (row) => (
        <img
          src={row.picture}
          alt={row.name}
          style={{ width: "50px", height: "50px" }}
        />
      ),
    },
  ];

  function navigateHandler1() {
    navigate1("/piechart");
  }
  function navigateHandler2() {
    navigate2("/barchart");
  }

  return (
    <>
      <h1 style={{ display: "flex", justifyContent: "center" }}>
        Detail view of Antelopes
      </h1>
      <div
        style={{
          padding: "20px",
          backgroundColor: "gray",
          margin: "auto",
          width: "75%",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "right",
            marginBottom: "20px",
          }}
        >
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleFilter}
            style={{ padding: "6px 10px" }}
          />
          {searchTerm && (
            <button onClick={clearSearch} style={{ marginLeft: "10px" }}>
              Clear
            </button>
          )}
        </div>
        <DataTable
          columns={columns}
          data={records}
          customStyles={customStyles}
          pagination
          style={{ width: "50%" }}
        />
        <div style={{justifyContent: "space-between", display: "flex"}}>
          <button
            style={{ padding: "20px", color: "blue", fontSize: "20px" }}
            onClick={navigateHandler1}
          >
            Click see Continent PieChart
          </button>
          <button
            style={{ padding: "20px", color: "blue", fontSize: "20px" }}
            onClick={navigateHandler2}
          >
            Click see Horns BarChart
          </button>
        </div>
      </div>
    </>
  );
}
export default ShowDataInTable;
