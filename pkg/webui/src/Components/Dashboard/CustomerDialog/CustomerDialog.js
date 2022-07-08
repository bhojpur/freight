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
import AddCustomerDialog from "./AddCustomerDialog";
import { useEffect } from "react";
import CustomerTableComponent from "./CustomerTableComponent";

export default function CustomerDialog({
  handleCustomerDialogClose,
  customerDialogOpen,
}) {
  const [customers, setCustomers] = useState([]);

  const [rows, setRows] = useState(customers);

  const [openAddNewCustomer, setOpenAddNewCustomer] = useState(false);

  const handleNewcustomerClickOpen = () => {
    setOpenAddNewCustomer(true);
  };

  const handleNewCustomerClose = () => {
    setOpenAddNewCustomer(false);
  };

  const getCustomers = async () => {
    //getCustomers is a function that returns a promise

    try {
      //try to get the customers from the database
      const response = await fetch("http://localhost:5000/customers/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("Access Token")}`,
        },
      });

      const jsonData = await response.json(); //convert the response to json
      setRows(jsonData);
      setCustomers(jsonData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCustomers();
  }, []);

  async function addNewCustomer(event) {
    console.log(event);
    //post a new customer to the database
    const salesRepId = localStorage.getItem("userId");
    const newCustomer = {
      salesRepId,
      ...event,
    };
    try {
      const response = await fetch("http://localhost:5000/customers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("Access Token")}`,
        },
        body: JSON.stringify(newCustomer),
      });
      if (response.status === 200) {
        getCustomers();
      }
    } catch (err) {
      console.log(err);
    }
  }

  const user = localStorage.getItem("userName");

  return (
    <div>
      <Dialog
        open={customerDialogOpen}
        onClose={handleCustomerDialogClose}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle>{user}'s Customers</DialogTitle>
        <DialogContent dividers style={{ height: "200px" }}>
          <div style={{ display: "flex" }}>
            <CustomerTableComponent rows={rows} setRows={setRows} />
          </div>
        </DialogContent>
        <AddCustomerDialog
          handleClickOpen={openAddNewCustomer}
          handleClose={handleNewCustomerClose}
          addNewCustomer={addNewCustomer}
          getCustomers={getCustomers}
        />

        <DialogActions>
          <Button onClick={handleNewcustomerClickOpen}>Add Customer</Button>

          <Button onClick={handleCustomerDialogClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}