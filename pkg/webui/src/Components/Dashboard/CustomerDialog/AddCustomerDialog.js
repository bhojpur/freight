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

export default function AddCustomerDialog({
  handleClickOpen,
  handleClose,
  addNewCustomer,
  getCustomers,
}) {
  const {
    //register,
    handleSubmit,
    control,
    //reset,
    formState: { errors },
  } = useForm();

  return (
    <div>
      <Dialog open={handleClickOpen} onClose={handleClose}>
        <DialogTitle>Add Customer Information</DialogTitle>
        <DialogContent>
          <form id="customerDialogForm" onSubmit={handleSubmit(addNewCustomer)}>
            <DialogContentText>
              Enter company name, primary contact, contact email, contact phone,
              city, and state/province.
            </DialogContentText>
            <Controller
              name="companyName"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  value={value || ""}
                  onChange={onChange}
                  autoFocus
                  margin="dense"
                  id="companyName"
                  label="Company Name"
                  type="outline"
                  variant="standard"
                  required
                />
              )}
            />
            <Controller
              name="primaryContact"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  value={value || ""}
                  onChange={onChange}
                  autoFocus
                  margin="dense"
                  id="primaryContact"
                  label="Primary Contact"
                  type="outline"
                  variant="standard"
                />
              )}
            />
            <Controller
              name="contactEmail"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  value={value || ""}
                  onChange={onChange}
                  autoFocus
                  margin="dense"
                  id="contactEmail"
                  label="Contact Email"
                  type="outline"
                  variant="standard"
                />
              )}
            />
            <Controller
              name="contactPhone"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  value={value || ""}
                  onChange={onChange}
                  autoFocus
                  margin="dense"
                  id="contactPhone"
                  label="Contact Phone"
                  type="outline"
                  variant="standard"
                />
              )}
            />
            <Controller
              name="city"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  value={value || ""}
                  onChange={onChange}
                  autoFocus
                  margin="dense"
                  id="city"
                  label="City"
                  type="outline"
                  variant="standard"
                />
              )}
            />
            <Controller
              name="stateProvince"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  value={value || ""}
                  onChange={onChange}
                  autoFocus
                  margin="dense"
                  id="stateProvince"
                  label="State/Province"
                  type="outline"
                  variant="standard"
                />
              )}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" form="customerDialogForm" onClick={handleClose}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}