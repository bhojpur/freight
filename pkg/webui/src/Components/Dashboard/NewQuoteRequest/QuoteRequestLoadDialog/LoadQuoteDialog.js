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
import HandlingUnitInput from "./LoadQuote/HandlingUnitInput";
import { useEffect } from "react";
import EquipmentTypeInput from "./LoadQuote/EquipmentTypeInput";

export default function LoadQuoteDialog({
  handleLoadQuoteDialogClose,
  handleLoadQuoteDialogOpen,
  loadQuoteDialogOpen,
  onSubmit,
  prev,
  getFormData,
  handleSubmitLoadQuoteDialogClose,
}) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const [loadData, setLoadData] = React.useState({});

  function getLoadData(e) {
    setLoadData((prevState) => {
      return { ...prevState, ...e };
    });
  }
  const [equipmentData, setEquipmentData] = React.useState({});

  function getEquipmentData(e) {
    setEquipmentData((prevState) => {
      return { ...prevState, ...e };
    });
  }

  useEffect(() => {
    getFormData({ loadData, equipmentData });
  }, [loadData, equipmentData]);

  return (
    <Dialog
      open={loadQuoteDialogOpen}
      onClose={handleLoadQuoteDialogClose}
      maxWidth="xl"
      fullWidth
    >
      <DialogTitle>Load Quote Dialog</DialogTitle>
      <DialogContent>
        <form id="loadQuoteDialogForm" onSubmit={handleSubmit(getFormData)}>
          <DialogContentText>
            Please enter Customer name, date, destination, orgin, equipment
            type, weight, number of pallets and dimensions.
          </DialogContentText>
        </form>
      </DialogContent>
      <HandlingUnitInput getLoadData={getLoadData} />
      <EquipmentTypeInput getEquipmentData={getEquipmentData} />
      <p>{JSON.stringify(equipmentData)}</p>
      <p>{JSON.stringify(loadData)}</p>
      <DialogActions>
        <Button onClick={handleLoadQuoteDialogClose}>Cancel</Button>
        <Button
          type="submit"
          form="loadQuoteDialogForm"
          onClick={handleSubmitLoadQuoteDialogClose}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}