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

import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useForm, Controller } from "react-hook-form";
import CustomerSearchBar from "./CustomerDialog/CustomerSearchBar";
import AddQuoteCustomerDialog from "./CustomerDialog/AddQuoteCustomerDialog";
import { useState } from "react";
import { useEffect } from "react";

export default function CustomerQuoteDialog({
  customerQuoteDialogOpen,
  handleCustomerQuoteDialogClose,
  onSubmit,
  next,
  getFormData,
}) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const [openAddNewCustomer, setOpenAddNewCustomer] = useState(false);

  const handleNewcustomerClickOpen = () => {
    setOpenAddNewCustomer(true);
  };

  const handleNewCustomerClose = () => {
    setOpenAddNewCustomer(false);
  };

  const [customers, setCustomers] = useState([]);

  const getCustomers = async () => {
    //getCustomers is a function that returns a promise
    const salesRepId = localStorage.getItem("userId");
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

      setCustomers(jsonData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCustomers();
  }, []);

  async function addNewCustomer(event) {
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
      getCustomers();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Dialog
      open={customerQuoteDialogOpen}
      onClose={handleCustomerQuoteDialogClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>Select A Customer</DialogTitle>
      <DialogContent>
        <form id="customerQuoteDialogForm" onSubmit={handleSubmit(getFormData)}>
          <br />
          <CustomerSearchBar
            returnCustomer={getFormData}
            customersProps={customers}
          />
        </form>
        <AddQuoteCustomerDialog
          handleClickOpen={openAddNewCustomer}
          handleClose={handleNewCustomerClose}
          addNewCustomer={addNewCustomer}
          getCustomers={getCustomers}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={handleCustomerQuoteDialogClose}>Cancel</Button>
        <Button type="submit" form="customerQuoteDialogForm" onClick={next}>
          Next
        </Button>
        <Button onClick={handleNewcustomerClickOpen}>Add New Customer</Button>
      </DialogActions>
    </Dialog>
  );
}