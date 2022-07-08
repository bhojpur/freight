// Copyright (c) 2018 Bhojpur Consulting Private Limited, India. All rights reserved.

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

import Button from "@mui/material/Button";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

import DialogTitle from "@mui/material/DialogTitle";

import { useState } from "react";
import AddCarrierDialog from "./AddCarrierDialog";
import { useEffect } from "react";
import CarrierTableComponent from "./CarrierTableComponent";

export default function CarrierDialog({
  handleCarrierDialogClose,
  carrierDialogOpen,
  carriers,
  setCarriers,
}) {
  const [rows, setRows] = useState(carriers);

  const [openAddNewCarrier, setOpenAddNewCarrier] = useState(false);

  const handleNewcarrierClickOpen = () => {
    setOpenAddNewCarrier(true);
  };

  const handleNewCarrierClose = () => {
    setOpenAddNewCarrier(false);
  };

  const getCarriers = async () => {
    //getCarriers is a function that returns a promise
    try {
      //try to get the carriers from the database
      const response = await fetch("http://localhost:5000/carriers", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("Access Token"),
        },
      });

      const jsonData = await response.json(); //convert the response to json

      setRows(jsonData);
      setCarriers(jsonData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCarriers();
  }, []);

  async function addNewCarrier(event) {
    //post a new carrier to the database
    console.log(event);
    try {
      const response = await fetch("http://localhost:5000/carriers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("Access Token"),
        },
        body: JSON.stringify(event),
      });
      if (response.status === 200) {
        getCarriers();
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <p>{JSON.stringify(carriers)}</p>
      <Dialog
        open={carrierDialogOpen}
        onClose={handleCarrierDialogClose}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle>Carrier</DialogTitle>
        <DialogContent dividers style={{ height: "200px" }}>
          <div style={{ display: "flex" }}>
            <CarrierTableComponent rows={rows} setRows={setRows} />
          </div>
        </DialogContent>
        <AddCarrierDialog
          handleClickOpen={openAddNewCarrier}
          handleClose={handleNewCarrierClose}
          addNewCarrier={addNewCarrier}
          getCarriers={getCarriers}
        />

        <DialogActions>
          <Button onClick={handleNewcarrierClickOpen}>Add Carrier</Button>

          <Button onClick={handleCarrierDialogClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}