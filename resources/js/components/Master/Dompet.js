import React, { useState, useEffect } from "react";

import axios from "axios";

import DataTable from "react-data-table-component";

import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import SortIcon from "@material-ui/icons/ArrowDownward";

import movies from "../movies";
import { LocalConvenienceStoreOutlined } from "@material-ui/icons";

function Dompet() {
  const dataList1 = [
    {
      id: 1,
      title: "Beetlejuice",
      year: "1988",
      runtime: "92",
      genres: ["Comedy", "Fantasy"],
      director: "Tim Burton",
      actors: "Alec Baldwin, Geena Davis, Annie McEnroe, Maurice Page",
      plot: 'A couple of recently deceased ghosts contract the services of a "bio-exorcist" in order to remove the obnoxious new owners of their house.',
      posterUrl:
        "https://images-na.ssl-images-amazon.com/images/M/MV5BMTUwODE3MDE0MV5BMl5BanBnXkFtZTgwNTk1MjI4MzE@._V1_SX300.jpg",
    },
    {
      id: 2,
      title: "The Cotton Club",
      year: "1984",
      runtime: "127",
      genres: ["Crime", "Drama", "Music"],
      director: "Francis Ford Coppola",
      actors: "Richard Gere, Gregory Hines, Diane Lane, Lonette McKee",
      plot: "The Cotton Club was a famous night club in Harlem. The story follows the people that visited the club, those that ran it, and is peppered with the Jazz music that made it so famous.",
      posterUrl:
        "https://images-na.ssl-images-amazon.com/images/M/MV5BMTU5ODAyNzA4OV5BMl5BanBnXkFtZTcwNzYwNTIzNA@@._V1_SX300.jpg",
    },
  ];
  const columns = [
    {
      name: "#",
      selector: "id",
      sortable: false,
    },
    {
      name: "Nama",
      selector: "nama",
      sortable: true,
    },
    {
      name: "Referensi",
      selector: "referensi",
      sortable: true,
    },
    {
      name: "Deskripsi",
      selector: "deskripsi",
      sortable: true,
    },
    {
      name: "Status",
      selector: "status",
      sortable: true,
    },
  ];

  const isIndeterminate = (indeterminate) => indeterminate;
  const selectableRowsComponentProps = { indeterminate: isIndeterminate };
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState([]);

  const baseURL = "http://localhost:8000";

  // handle change event of search input
  const handleChange = (value) => {
    setSearchText(value);
    filterData(value);
  };

  // filter records by search text
  const filterData = (value) => {
    const lowercasedValue = value.toLowerCase().trim();
    if (lowercasedValue === "") setData(dataList);
    else {
      const filteredData = dataList.filter((item) => {
        return Object.keys(item).some((key) =>
          item[key].toString().toLowerCase().includes(lowercasedValue)
        );
      });
      setData(filteredData);
    }
  };

  useEffect(() => {
    axios.get(baseURL + "/api/dompet").then((response) => {
      setData(response.data.dompet);
      console.log(response.data.dompet);
    });
  }, []);

  return (
    <>
      <div>Dompet</div>
      <div>
        Search:{" "}
        <input
          style={{ marginLeft: 5 }}
          type="text"
          placeholder="Type to search..."
          value={searchText}
          onChange={(e) => handleChange(e.target.value)}
        />
      </div>
      <div>
        <Paper>
          <DataTable
            title="Movies"
            columns={columns}
            data={data}
            defaultSortField="title"
            sortIcon={<SortIcon />}
            pagination
            paginationResetDefaultPage={resetPaginationToggle}
          />
        </Paper>
      </div>
    </>
  );
}

export default Dompet;
