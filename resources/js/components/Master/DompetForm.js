import React, { useState } from "react";

import {
  TextField,
  Divider,
  Button,
  Select,
  MenuItem,
  InputLabel,
} from "@material-ui/core/";

function DompetForm({ modalState, rowDataModal }) {
  console.log("modalstae", modalState);
  console.log("rowdatamodal", rowDataModal);

  const [fieldNama, setFieldNama] = useState("");
  const [fieldReferensi, setFieldReferensi] = useState(0);
  const [fieldDeskripsi, setFieldDeskripsi] = useState("");
  const [fieldStatus, setFieldStatus] = useState(
    rowDataModal.id ? (rowDataModal.status === "Aktif" ? 1 : 0) : 2
  );

  const handleSubmit = (value) => {
    console.log(
      "fieldsnew : ",
      fieldNama,
      fieldReferensi,
      fieldDeskripsi,
      "\nstatus : ",
      fieldStatus,
      "\nvalue ",
      value
    );

    let data, fieldname, fieldref, fielddesc, fieldstat;

    // buat Baru
    if (value === 0) {
      fieldname = fieldNama === "" ? rowDataModal.nama : fieldNama;
      fieldref = fieldReferensi === 0 ? rowDataModal.referensi : fieldReferensi;
      fielddesc =
        fieldDeskripsi === "" ? rowDataModal.deskripsi : fieldDeskripsi;
      fieldstat = fieldStatus === 2 ? rowDataModal.status : fieldStatus;

      data = {
        id: rowDataModal.id,
        nama: fieldname,
        referensi: fieldref,
        deskripsi: fielddesc,
      };
      try {
        axios.post("/api/adddompet/", data).then((res) => {
          if (res.data.status === 200) {
            console.log(res);
            location.reload();
          } else console.log("Error");
        });
      } catch (error) {
        console.log("error");
      }
    }

    // edit
    else if (value === 1) {
      fieldname = fieldNama === "" ? rowDataModal.nama : fieldNama;
      fieldref = fieldReferensi === 0 ? rowDataModal.referensi : fieldReferensi;
      fielddesc =
        fieldDeskripsi === "" ? rowDataModal.deskripsi : fieldDeskripsi;
      fieldstat = fieldStatus === 2 ? rowDataModal.status : fieldStatus;

      data = {
        id: rowDataModal.id,
        nama: fieldname,
        referensi: fieldref,
        deskripsi: fielddesc,
        status: fieldstat,
      };
      try {
        axios.put("/api/editdompet/", data).then((res) => {
          if (res.data.status === 200) {
            console.log(res);
            location.reload();
          } else console.log("Error");
        });
      } catch (error) {
        console.log("error");
      }
    }
  };

  //buat baru
  if (modalState === 0) {
    return (
      <div className="mx-4 my-2">
        <h4>Dompet Baru</h4>
        <Divider />
        <div className="my-2">
          <TextField
            required
            fullWidth
            label="Nama"
            defaultValue="ex: John"
            onChange={(e) => {
              if (e.target.value) {
                setFieldNama(e.target.value);
              }
            }}
          />
        </div>
        <div className="my-2">
          <TextField
            required
            fullWidth
            label="Referensi"
            type="number"
            onChange={(e) => {
              if (e.target.value) {
                setFieldReferensi(e.target.value);
              }
            }}
          />
        </div>
        <div className="my-2">
          <TextField
            required
            fullWidth
            label="Deskripsi"
            defaultValue="ex: Bank BCA"
            onChange={(e) => {
              if (e.target.value) {
                setFieldDeskripsi(e.target.value);
              }
            }}
          />
        </div>
        <Divider />
        <div className="mb-2 mt-4">
          <Button
            fullWidth
            variant="contained"
            color="primary"
            disableElevation
            onClick={() => handleSubmit(0)}
          >
            Buat Dompet
          </Button>
        </div>
      </div>
    );
  }

  // detail
  else if (modalState === 1) {
    if (rowDataModal.id) {
      return (
        <div className="mx-4 my-2">
          <h4>Dompet {rowDataModal.nama}</h4>
          <Divider />
          <div className="my-2">
            <TextField
              disabled
              fullWidth
              label="Nama"
              defaultValue={rowDataModal.nama}
            />
          </div>
          <div className="my-2">
            <TextField
              disabled
              fullWidth
              label="Referensi"
              defaultValue={rowDataModal.referensi}
            />
          </div>
          <div className="my-2">
            <TextField
              disabled
              fullWidth
              label="Deskripsi"
              defaultValue={rowDataModal.deskripsi}
            />
          </div>
          <Divider />
          <div className="my-2">
            <p>Status : {rowDataModal.status}</p>
          </div>
        </div>
      );
    } else alert("error");
  }

  // edit
  else if (modalState === 2) {
    if (rowDataModal.id) {
      return (
        <div className="mx-4 my-2">
          <h4>Dompet {rowDataModal.nama}</h4>
          <Divider />
          <div className="my-2">
            <TextField
              required
              fullWidth
              label="Nama"
              defaultValue={rowDataModal.nama}
              onChange={(e) => {
                if (e.target.value) {
                  setFieldNama(e.target.value);
                }
              }}
            />
          </div>
          <div className="my-2">
            <TextField
              required
              fullWidth
              label="Referensi"
              defaultValue={rowDataModal.referensi}
              onChange={(e) => {
                if (e.target.value) {
                  setFieldReferensi(e.target.value);
                }
              }}
            />
          </div>
          <div className="my-2">
            <TextField
              required
              fullWidth
              label="Deskripsi"
              defaultValue={rowDataModal.deskripsi}
              onChange={(e) => {
                if (e.target.value) {
                  setFieldDeskripsi(e.target.value);
                }
              }}
            />
          </div>
          <Divider />
          <div className="my-2">
            <InputLabel>Status</InputLabel>
            <Select
              value={fieldStatus}
              onChange={(e) => setFieldStatus(e.target.value)}
            >
              <MenuItem value={1}>Aktif</MenuItem>
              <MenuItem value={0}>Non Aktif</MenuItem>
            </Select>
          </div>
          <Divider />
          <div className="mb-2 mt-4">
            <Button
              fullWidth
              variant="contained"
              color="primary"
              disableElevation
              onClick={() => handleSubmit(1)}
            >
              Simpan
            </Button>
          </div>
        </div>
      );
    } else alert("error");
  }
}

export default DompetForm;
