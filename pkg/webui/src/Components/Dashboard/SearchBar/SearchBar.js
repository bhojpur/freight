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
import TextField from "@mui/material/TextField";

import Autocomplete from "@mui/material/Autocomplete";

//SearchBar is a component that allows the user to search for a quote request along with the accompanying carrier data.
//It takes three props:
//1. dashBoardObjectArray: an array of objects that each contain a quote request and the corresponding carrier information.
//2. updateDashboard: a callback function that takes in a the dashBoardObejct returned from the search bar,
//which updates the state of quoteObject and carrierTable in the Dashboard component.
//3. formattedQuoteRequestArray: an array of objects that have been formatted to be displayed in the search bar.

export default function SearchBar({
  updateDashboard,
  dashBoardObjectArray,
  formattedQuoteRequestArray,
}) {
  return (
    <Autocomplete
      sx={{ width: "50%", margin: "auto" }}
      freeSolo
      id="searchBar"
      disableClearable
      options={formattedQuoteRequestArray.map((option) => option.display)}
      onChange={(event, value) => {
        populateDashboard(value, dashBoardObjectArray, updateDashboard);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search by Quote Request Number, Customer Name, Origin, or Destination"
          InputProps={{
            ...params.InputProps,
            type: "search",
          }}
        />
      )}
    />
  );
}
//populateDashboard takes in the value returned from the search bar and the array of dashBoard objects, and the updateDashboard callback
//function. It first uses the quote request number in the formatted quoteRequest, then iterates through the dashBoardObjectArray.
//if the quote number of the dashBoardObject matches the value of the formatted quoteRequest selected in the search bar,
//it calls the updateDashboard callback function with that dashBoardObject as an argument, which is used to update the Dashboard component

function populateDashboard(value, dashBoardObjectArray, updateDashboard) {
  let quoteRequestNumber = value.charAt(14);

  dashBoardObjectArray.forEach((dashBoardObject) => {
    if (
      quoteRequestNumber === dashBoardObject.quoteObject.quoteNumber.toString()
    ) {
      updateDashboard(dashBoardObject);
    }
  });
}