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
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import CarrierForm from "./CarrierForm";

// CarrierTable is the component that renders the table. It takes three props:
// 1. tableData: an array of objects that contain the carrier information
// 2. setTableData: a callback function that takes in an array of objects as they are returned from CarrierForm and updates the tableData array
// 3. quoteRequestDefined: a boolean that is true if the user has defined a quote request;
// it is used to prevent the user from submitting the form if they have not defined a quote request

export default function CarrierTable({
  tableData,
  quoteRequestDefined,
  setTableData,
  quoteRequestId,
}) {
  //rows is an array of objects, each a submit event returned from CarrierForm that will be displayed in the table
  //when CarrierTable is rendered, the empty tableData array is passed in as a prop from the Dashboard component,
  //which is how we are clearing the table when the user submits a new quote request
  let rows = tableData;

  //This function is passed as a callback to CarrierForm and called when the user clicks the "Add Carrier" button,
  //which is rendered in the Dashboard component. It takes the event from the form and pushes it to the tableData array,
  //which is then rendered dynamically in the table and then returned to the Dashboard component, where it is stored for search

  async function addCarrier(event) {
    try {
      const response = await fetch("http://localhost:5000/carriers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("Access Token")}`,
        },
        body: JSON.stringify(event),
      });
      const body = await response.json();
      const carrierId = body.id;
      return carrierId;
    } catch (err) {
      console.log(err);
    }
  }

  const createNewEntryOnSubmit = (event) => {
    if (quoteRequestDefined === true) {
      setTableData([...tableData, event]);
      //add offer to offer table
      //need to get quoteRequestId from dashboard
      //need to get carrierId from database
      addCarrier(event).then((carrierId) => {
        fetch("http://localhost:5000/offers", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("Access Token")}`,
          },
          body: JSON.stringify({
            quoteRequestId: quoteRequestId,
            carrierId: carrierId,
            rate: event.rate,
            notes: event.notes,
          }),
        });
      });

      console.log(event);
    }
  };

  return (
    <div>
      <div>
        <TableContainer component={Paper} elevation={6}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Carrier Name</TableCell>
                <TableCell align="right">Phone Number</TableCell>
                <TableCell align="right">Extension</TableCell>
                <TableCell align="right">Dispatch Email</TableCell>
                <TableCell align="right">Contact Name</TableCell>
                <TableCell align="right">Rate</TableCell>
                <TableCell align="right">Notes</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.carrierName}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left">{row.carrierName}</TableCell>
                  <TableCell align="right">{row.phone}</TableCell>
                  <TableCell align="right">{row.contactExt}</TableCell>
                  <TableCell align="right">{row.contactEmail}</TableCell>
                  <TableCell align="right">{row.contactName}</TableCell>
                  <TableCell align="right">{row.rate}</TableCell>
                  <TableCell align="right">{row.notes}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div>
        <CarrierForm
          createNewEntryOnSubmit={createNewEntryOnSubmit}
          quoteRequestDefined={quoteRequestDefined}
        />
      </div>
    </div>
  );
}