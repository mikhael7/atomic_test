import React, { useState, useEffect } from "react";

import axios from "axios";

import DataTable from "react-data-table-component";

import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";

import SortIcon from "@material-ui/icons/ArrowDownward";

import Modal from "react-bootstrap/Modal";

import movies from "../movies";
import { LocalConvenienceStoreOutlined } from "@material-ui/icons";
import DompetForm from "./DompetForm";

function Dompet() {
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
    {
      name: "Action",
      cell: (row) => (
        <Select value={"Status"}>
          <MenuItem onClick={() => handleDetail(row)}>Detail</MenuItem>
          <MenuItem onClick={() => handleChangeForm(row)}>Ubah</MenuItem>
          <MenuItem
            onClick={() =>
              handleChangeStatus(row.status === "Non Aktif" ? 1 : 0, row)
            }
          >
            {row.status === "Non Aktif" ? "Aktif" : "Non Aktif"}
          </MenuItem>
        </Select>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  const isIndeterminate = (indeterminate) => indeterminate;
  const selectableRowsComponentProps = { indeterminate: isIndeterminate };
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState([]);
  const [status, setStatus] = useState([]);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalState, setModalState] = useState(0);
  const [rowDataModal, setrowDataModal] = useState();

  const baseURL = "http://localhost:8000";
  // let rowDataModal = {};

  // handle change event of search input
  const handleChange = (value) => {
    setSearchText(value);
    filterData(value);
  };

  const handleChangeStatus = (value, rowData) => {
    let data = {
      id: rowData.id,
      status: value,
    };
    try {
      axios.put("/api/changeStatus/", data).then((res) => {
        if (res.data.status === 200) {
          console.log({ status: res.status, message: res.message });
          location.reload();
        } else console.log("Error");
      });
    } catch (error) {
      console.log("error");
    }
  };

  const handleNew = () => {
    setrowDataModal("");
    setModalState(0);
    setModalOpen(true);
  };

  const handleDetail = (rowData) => {
    setrowDataModal(rowData);
    setModalState(1);
    setModalOpen(true);
  };

  const handleChangeForm = (rowData) => {
    setrowDataModal(rowData);
    setModalState(2);
    setModalOpen(true);
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

  const handleModal = () => {
    setModalOpen(!modalOpen);
  };

  const subHeaderComponent = (
    <div className="row w-100 align-items-center justify-content-end">
      <div className="col-5"></div>
      <div className="col-2 text-end">
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            handleNew();
          }}
        >
          Buat Baru
        </Button>
      </div>
      <div className="col-2">
        <InputLabel fullWidth shrink>
          Status
        </InputLabel>
        <Select fullWidth value={0}>
          <MenuItem value={0}>Non Aktif</MenuItem>
          <MenuItem value={1}>Aktif</MenuItem>
          <MenuItem value={2}>All</MenuItem>
        </Select>
      </div>
      <div className="col-2">
        <TextField
          fullWidth
          label="Search"
          margin="normal"
          variant="outlined"
          size="small"
          onChange={(e) => handleChange(e.target.value)}
        />
      </div>
    </div>
  );

  useEffect(() => {
    axios.get(baseURL + "/api/dompet").then((response) => {
      if (response.status === 200) {
        let res = response.data;
        res.dompet.map((key) => {
          if (key.status === "1") key.status = "Aktif";
          else key.status = "Non Aktif";
        });
        setData(res.dompet);
      }
    });
  }, []);

  return (
    <>
      <div>
        <Paper>
          <DataTable
            title="Dompet"
            columns={columns}
            data={data}
            defaultSortField="status"
            sortIcon={<SortIcon />}
            pagination
            paginationResetDefaultPage={resetPaginationToggle}
            subHeader
            subHeaderComponent={subHeaderComponent}
          />
        </Paper>
      </div>
      <Modal show={modalOpen} onHide={handleModal} size="md" centered>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <DompetForm modalState={modalState} rowDataModal={rowDataModal} />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Dompet;
