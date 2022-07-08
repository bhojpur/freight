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

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useForm, Controller } from "react-hook-form";

import LaneStopInput from "./LaneQuote/LaneStopInput";

export default function LaneQuoteDialog({
  handleLaneQuoteDialogClose,
  handleLaneQuoteDialogOpen,
  onSubmit,
  laneQuoteDialogOpen,
  next,
  prev,
  cities,
  getFormData,
}) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const [laneStops, setLaneStops] = React.useState([]);

  function getLaneStops(e) {
    setLaneStops((prevState) => {
      // Object.assign would also work
      getFormData({ ...prevState, ...e });
    });
  }

  return (
    <>
      <Dialog open={laneQuoteDialogOpen} onClose={handleLaneQuoteDialogClose}>
        <DialogTitle>Enter Lane Information</DialogTitle>
        <DialogContent>
          <form id="laneQuoteDialogForm">
            <DialogContentText>
              <p>{JSON.stringify(laneStops)}</p>
              Add origin and destination. For extra picks or drops, add
              additional origins and/or destinations.
            </DialogContentText>
            <span>
              <LaneStopInput cities={cities} getLaneStops={getLaneStops} />
            </span>
          </form>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleLaneQuoteDialogClose}>Cancel</Button>
          <Button onClick={prev}>Prev</Button>
          <Button form="laneQuoteDialogForm" onClick={next}>
            Next
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}