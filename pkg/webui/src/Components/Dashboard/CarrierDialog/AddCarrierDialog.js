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
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useForm, Controller } from "react-hook-form";

export default function AddCarrierDialog({
  handleClickOpen,
  handleClose,
  addNewCarrier,
  getCarriers,
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
        <DialogTitle>Add Carrier Information</DialogTitle>
        <DialogContent>
          <form id="carrierDialogForm" onSubmit={handleSubmit(addNewCarrier)}>
            <DialogContentText>
              Enter carrier name, contact email, contact phone + extension and
              contact name.
            </DialogContentText>
            <Controller
              name="carrierName"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  value={value || ""}
                  onChange={onChange}
                  autoFocus
                  margin="dense"
                  id="carrierName"
                  label="Carrier Name"
                  type="outline"
                  variant="standard"
                  required
                />
              )}
            />
            <Controller
              name="phone"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  value={value || ""}
                  onChange={onChange}
                  autoFocus
                  margin="dense"
                  id="phone"
                  label="Phone Number"
                  type="outline"
                  variant="standard"
                />
              )}
            />
            <Controller
              name="contactExt"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  value={value || ""}
                  onChange={onChange}
                  autoFocus
                  margin="dense"
                  id="contactExt"
                  label="Extension"
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
              name="contactName"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  value={value || ""}
                  onChange={onChange}
                  autoFocus
                  margin="dense"
                  id="contactName"
                  label="Contact Name"
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
          <Button type="submit" form="carrierDialogForm" onClick={handleClose}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}